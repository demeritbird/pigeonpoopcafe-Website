package main

import (
	"backend/internal/models"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
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
	userDB, err := app.DB.GetUserByUsername(requestPayload.Username)
	if err != nil {
		app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
		return
	}

	// check token
	valid, err := userDB.PinTokenMatches(requestPayload.PinToken)
	if err != nil || !valid {
		app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
		return
	}

	// create a JWT user
	loginUser := jwtUser{
		ID:       userDB.ID,
		Username: userDB.Username,
	}

	// generate tokenPair
	tokenPair, err := app.auth.GenerateTokenPair(&loginUser)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	loginUserWToken := models.CurrentUser{
		ID:          userDB.ID,
		Username:    userDB.Username,
		AccessToken: tokenPair.AccessToken,
	}

	refreshCookie := app.auth.GetRefreshCookie(tokenPair.RefreshToken)
	http.SetCookie(w, refreshCookie)
	app.successJSON(w, http.StatusOK, loginUserWToken)
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

func (app *application) refreshToken(w http.ResponseWriter, r *http.Request) {
	if len(r.Cookies()) == 0 {
		app.errorJSON(w, errors.New("no refresh token found for session"), http.StatusUnauthorized)
		return
	}

	for _, cookie := range r.Cookies() {
		if cookie.Name == app.auth.CookieName {
			claims := &Claims{}
			refreshToken := cookie.Value

			// parse the token to get the claims
			_, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(app.JWTSecret), nil
			})
			if err != nil {
				app.errorJSON(w, errors.New("unauthorized"), http.StatusUnauthorized)
				return
			}

			// get the user id from the token claims
			userID, err := strconv.Atoi(claims.Subject)
			if err != nil {
				app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			// attempt to make sure user still exists.
			userDB, err := app.DB.GetUserByID(userID)
			if err != nil {
				app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			refreshUser := jwtUser{
				ID:       userDB.ID,
				Username: userDB.Username,
			}

			tokenPair, err := app.auth.GenerateTokenPair(&refreshUser)
			if err != nil {
				app.errorJSON(w, errors.New("error generating tokens"), http.StatusUnauthorized)
				return
			}

			refreshUserWToken := models.CurrentUser{
				ID:          userDB.ID,
				Username:    userDB.Username,
				AccessToken: tokenPair.AccessToken,
			}

			http.SetCookie(w, app.auth.GetRefreshCookie(tokenPair.RefreshToken))
			app.successJSON(w, http.StatusOK, refreshUserWToken)
		}
	}
}

func (app *application) logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, app.auth.GetExpiredRefreshCookie())
	w.WriteHeader(http.StatusAccepted)
}
