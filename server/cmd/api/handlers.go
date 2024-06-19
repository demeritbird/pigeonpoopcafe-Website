package main

import (
	"backend/internal/models"
	"errors"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
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

func (app *application) login(w http.ResponseWriter, r *http.Request) {
	// read JSON payload
	var requestPayload struct {
		Username string `json:"username"`
		PinToken string `json:"pintoken"`
	}
	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	// validate user against database
	user, err := app.DB.GetUserByUsername(requestPayload.Username)
	if err != nil {
		app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
	}

	// check token
	valid, err := user.PinTokenMatches(requestPayload.PinToken)
	if err != nil || !valid {
		app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
	}

	// create a JWT user
	newUser := jwtUser{
		ID:       user.ID,
		Username: user.Username,
	}

	// generate tokens
	tokens, err := app.auth.GenerateTokenPair(&newUser)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	refreshCookie := app.auth.GetRefreshCookie(tokens.RefreshToken)
	http.SetCookie(w, refreshCookie)
}

func (app *application) signup(w http.ResponseWriter, r *http.Request) {
	var requestPayload struct {
		Username       string `json:"username"`
		Email          string `json:"email"`
		UserPinToken   string `json:"user_pintoken"`
		MasterPinToken string `json:"master_pintoken"`
	}
	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	// validate the payload
	// FIXME: make changes to ensure masterpintoken from env var is correct
	// FIXME: make changes so that username needs to be unique
	if requestPayload.Username == "" || requestPayload.Email == "" || requestPayload.UserPinToken == "" || requestPayload.MasterPinToken == "" {
		app.errorJSON(w, errors.New("invalid input data"), http.StatusBadRequest)
		return
	}

	// generate hashed token
	hashedUserPinToken, err := bcrypt.GenerateFromPassword([]byte(requestPayload.UserPinToken), bcrypt.DefaultCost)
	if err != nil {
		app.errorJSON(w, err, http.StatusInternalServerError)
		return
	}

	user := &models.User{
		Username: requestPayload.Username,
		Email:    requestPayload.Email,
		PinToken: string(hashedUserPinToken),
	}

	// TODO: would be nice to create a confirm create user or success email

	err = app.DB.CreateUser(user)
	if err != nil {
		app.errorJSON(w, errors.New("could not create user"), http.StatusBadRequest)
	}
}
