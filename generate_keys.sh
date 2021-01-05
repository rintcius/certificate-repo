#!/bin/sh
openssl req -x509 -newkey rsa:4096 -keyout server_key.pem -out server_cert.pem -nodes -subj "/CN=localhost/O=PrettyCool"
