package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

const port = 8080

type application struct {
	Domain string
	DSN    string
	DB     *sql.DB
}

func main() {
	// Load env file
	if os.Getenv("LOCAL_ENV") == "" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	//// Set Application Config ////
	var app application

	//// Read from Command Line ////
	app.Domain = "example.com"
	flag.StringVar(&app.DSN, "dsn", "host="+os.Getenv("DATABASE_HOST")+" port="+os.Getenv("DATABASE_PORT")+" user="+os.Getenv("DATABASE_USER")+" password="+os.Getenv("DATABASE_PASS")+" dbname="+os.Getenv("DATABASE_NAME")+" sslmode=disable timezone=UTC connect_timeout=5", "Flag Description")
	flag.Parse()

	// Now you can access the value of the DSN flag using the dsnFlag variable.

	//// Connect to the Database ////
	// connect to the database
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = conn
	defer app.DB.Close()

	//// Start a Web Server ////
	log.Println("Starting application on port", port)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}
