package main

import (
	"backend/internal/repository"
	"backend/internal/repository/dbrepo"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/joho/godotenv"
)

const port = 8080

type application struct {
	Domain       string
	DSN          string
	DB           repository.DatabaseRepo
	auth         Auth
	JWTSecret    string
	JWTIssuer    string
	JWTAudience  string
	CookieDomain string
	Mailer       Mail
	Wait         *sync.WaitGroup
	InfoLog      *log.Logger
	ErrorLog     *log.Logger
}

func main() {
	//// Set Application Config ////
	var app application

	// Set up loggers
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
	app.InfoLog = infoLog
	app.ErrorLog = errorLog

	// Load env file
	if os.Getenv("LOCAL_ENV") == "" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	//// Read from Command Line ////
	app.Domain = "example.com"
	app.DSN = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s timezone=UTC connect_timeout=5",
		os.Getenv("DATABASE_HOST"),
		os.Getenv("DATABASE_PORT"),
		os.Getenv("DATABASE_USER"),
		os.Getenv("DATABASE_PASS"),
		os.Getenv("DATABASE_NAME"),
		os.Getenv("DATABASE_SSLMODE"),
	)
	flag.StringVar(&app.JWTSecret, "jwt-secret", "debugsecret", "signing secret") // TODO: change this when complete
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "signing issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "signing audience")
	flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "cookie domain")
	flag.StringVar(&app.Domain, "domain", "localhost", "domain")
	flag.Parse()

	// Now you can access the value of the DSN flag using the dsnFlag variable.

	//// Connect to the Database ////
	// connect to the database
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	app.auth = Auth{
		Issuer:        app.JWTIssuer,
		Audience:      app.JWTAudience,
		Secret:        app.JWTSecret,
		TokenExpiry:   time.Minute * 5,
		RefreshExpiry: time.Hour * 24,
		CookiePath:    "/",
		CookieName:    "jwt",
		CookieDomain:  app.CookieDomain,
	}

	// Set up mailer
	wg := sync.WaitGroup{}
	app.Wait = &wg

	app.Mailer = app.createMail()
	go app.listenForMail()

	//// Start a Web Server ////
	log.Println("Starting application on port", port)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}

func (app *application) createMail() Mail {
	errorChan := make(chan error)
	mailerChan := make(chan Message, 100)
	mailerDoneChan := make(chan bool)

	var m Mail
	if os.Getenv("LOCAL_ENV") == "" {
		// Create mail using mailhog
		m = Mail{
			Domain:      "localhost",
			Host:        "localhost",
			Port:        1025,
			Encryption:  "none",
			FromName:    "demeritbird",
			FromAddress: "demeritbird@gmail.com",
			Wait:        app.Wait,
			ErrorChan:   errorChan,
			MailerChan:  mailerChan,
			DoneChan:    mailerDoneChan,
		}
	} else {
		// Create mail using go-simple-mail
		m = Mail{
			Domain:      "smtp.gmail.com",
			Host:        "smtp.gmail.com",
			Port:        587,
			Encryption:  "tls",
			FromName:    "demeritbird",
			FromAddress: "demeritbird@gmail.com",
			Username:    os.Getenv("EMAIL_USER"),
			Password:    os.Getenv("EMAIL_PASS"),
			Wait:        app.Wait,
			ErrorChan:   errorChan,
			MailerChan:  mailerChan,
			DoneChan:    mailerDoneChan,
		}
	}

	return m
}
