package main

import (
	"fmt"
	"net/http"
)

func (app *application) ping(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "pong")
}

func (app *application) sendGreetingEmail(w http.ResponseWriter, r *http.Request) {
	msg := Message{
		From:    "demeritbird@gmail.com",
		To:      "lekjiewei@hotmail.sg", // TODO: Change To address based on form POST request.
		Subject: "Hello!",
		Data:    "Let's have a chat! Feel free to reply to this email to reach me.",
	}
	app.sendEmail(msg)
}
