# certificate-repo
`npm i && ./generate_keys.sh && node index.js`

`./test.sh`

`./testfail.sh`

https://localhost:5000/token returns an access token and refresh token in json when the connection is made with the generated cert and key and returns 401 otherwise.

https://localhost:5000/ping requires access token in auth header returns arbitrary message in json if successful otherwise returns 401.
