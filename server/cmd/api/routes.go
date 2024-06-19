package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	mux := chi.NewRouter()

	// Middlewares
	mux.Use(middleware.Recoverer)
	mux.Use(app.enableCORS)

	// Routes
	mux.Get("/", app.ping)
	mux.Get("/refresh", app.refreshToken)
	mux.Post("/login", app.login)
	mux.Post("/signup", app.signup)
	mux.Get("/logout", app.logout)
	mux.Post("/sendGreetingEmail", app.sendGreetingEmail)

	mux.Route("/user", func(mux chi.Router) {
		mux.Use(app.authRequired)
	})

	return mux
}
