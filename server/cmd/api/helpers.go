package main

func (app *application) sendEmail(msg Message) {
	app.Wait.Add(1)
	app.Mailer.MailerChan <- msg
}
