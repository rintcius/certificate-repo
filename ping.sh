#!/bin/sh
CURL_CA_BUNDLE=server_cert.pem curl --cert server_cert.pem --key server_key.pem https://localhost:5000/ping -H "Authorization: Bearer akdjfaslkdfjalkdj"
