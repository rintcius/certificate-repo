const express = require("express")
const fs = require("fs")
const https = require("https")
const app = express()
const accessToken = "akdjfaslkdfjalkdj"
const port = 5000

app.get("/authorize", (req, res) => {
  res.redirect(301, req.query.redirect_uri + "?code=whatever&state=" + req.query.state)
})

app.get("/token", (req, res) => {
	if (req.client.authorized) {
		res.send(JSON.stringify({"access_token": accessToken, "refresh_token": "haha"}))
	} else {
		res.status(401).send(JSON.stringify({"error":"unauthorized"}))
	}
})

app.get("/ping", (req, res) => {
	if (req.client.authorized && (req.get("Authorization") === "Bearer " + accessToken)) {
		res.send(JSON.stringify({"ping": "pong"}))
	} else {
		res.status(401).send(JSON.stringify({"error":"unauthorized"}))
	}
})

https
  .createServer({ key: fs.readFileSync("server_key.pem"), cert: fs.readFileSync("server_cert.pem"), ca: [ fs.readFileSync("server_cert.pem") ], requestCert: true, rejectUnauthorized: false }, app)
  .listen(port, _ => console.log("Listening on https://localhost:" + port))

