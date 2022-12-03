# API Documentation

## /api/login
Initiates the OAuth flow to log in with Github. Redirects the user to Github to log in.

## /api/logout
Destroys the user's session and removes the cookie, redirects to the landing page.

## /api/login\_callback
Receives a code from Github via a query parameter named `code`. The user will be redirected from Github to this API route after logging in. 

We use this code to make an API request to get the user's public profile information.

We get the user's public profile information and save it in the session.

## /api/user/progress
Gets the user's profile and statistics

## /api/user/session
Mostly used for debugging, lists the current items stored in the user's session.
