package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

func main() {
	//// Set Application Config ////

	//// Read from Command Line ////

	//// Connect to the Database ////

	//// Start a Web Server ////'
	log.Println("Starting application on port", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}

}
