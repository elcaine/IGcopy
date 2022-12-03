# Input\_Golf

## Overview
This repository contains the code for our next.js server, which will later be connected to a MongoDB server.

## Need help on Next.js?
Check the documentation [https://nextjs.org/docs](here)

## Running the server

### Old way:
Make sure startdev.sh is executable, then run it with ./startdev.sh. This contains a simple command to start the server in development mode using Docker. It maps port 80 on the host machine to port 3000 in the container. This means to connect to the web server, you will need to visit http://localhost:80 in your browser.
### New way (with MongoDB):
Install docker-compose. Run sudo `docker-compose up -d` from within the Input\_Golf directory. Any changes you make to the source code will apply in real-time.

### Important note: you need a .env file! Ask for it if you need it.
