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
	console.log(req.query)
	if (req.client.authorized && (req.get("Authorization") === "Bearer " + accessToken)) {
		res.send(JSON.stringify({"ping": {"pong": 42, "page": req.query.page, "limit": req.query.limit }}))
	} else {
		res.status(401).send(JSON.stringify({"error":"unauthorized"}))
	}
})

app.get("/simple/token", (req, res) => {
		res.send(JSON.stringify({"access_token": accessToken, "expires_in": 60 }))
})

app.get("/simple/ping", (req, res) => {
	console.log(req.query)
	if (req.get("Authorization") === "Bearer " + accessToken) {
		res.send(JSON.stringify({"ping": {"pong": 42, "page": req.query.page, "limit": req.query.limit }}))
	} else {
		res.status(401).send(JSON.stringify({"error":"unauthorized"}))
	}
})

app
  // .createServer({ key: fs.readFileSync("server_key.pem"), cert: fs.readFileSync("server_cert.pem"), ca: [ fs.readFileSync("server_cert.pem") ], requestCert: false, rejectUnauthorized: false }, app)
  .listen(port, _ => console.log("Listening on https://localhost:" + port))

