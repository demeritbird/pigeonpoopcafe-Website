package main

import (
	"fmt"
	"net/http"
)

func (app *application) ping(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "pong")
}

func (app *application) sendGreetingEmail(w http.ResponseWriter, r *http.Request) {
	var requestPayload struct {
		Email string `json:"email"`
	}
	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	msg := Message{
		From:    "demeritbird@gmail.com",
		To:      requestPayload.Email,
		Subject: "Hello!",
		Data:    "Let's have a chat! Feel free to reply to this email to reach me.",
	}
	app.sendEmail(msg)
}

func (app *application) authenticate(w http.ResponseWriter, r *http.Request) {
	// read JSON payload

	// validate user against database

	// check password

	// create a JWT user
	newUser := jwtUser{
		ID:       1,
		Username: "demeritbird",
	}

	// generate tokens
	tokens, err := app.auth.GenerateTokenPair(&newUser)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	// provide logged token as string to output
	w.Write([]byte(tokens.Token))
}
