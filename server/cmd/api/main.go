package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	//// Set Application Config ////
	var app application

	//// Read from Command Line ////
	app.Domain = "example.com"

	//// Connect to the Database ////

	//// Start a Web Server ////'
	log.Println("Starting application on port", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}
