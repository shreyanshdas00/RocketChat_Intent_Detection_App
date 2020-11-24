# RocketChat_Intent_Detection_App

Deploys a RocketChat server with a content filter that blocks messages with intent of direct contact and reports the details of the exchange to the "admin" channel.

Usage:

1.	Clone the code from the repository

o	Find line 19 of the rocket.chat/docker-compose.yml file, which begins with ROOT_URL and put
ROOT_URL= (url where server is to be deployed)

2.	RocketChat server setup, run the following commands in the terminal: 

o	cd RocketChat_Intent_Detection_App

o	sh server_setup.sh

  Prompts for details of the app,
  
  App name: direct-contact-detection
  
  rest of the details can be filled in as desired

3.	When prompted, visit the url where the server is deployed (http://localhost:3000) and setup your server and admin account:

o	Enable Apps development mode by navigating to Administration -> General then scroll down to Apps and click on the True radio button over the Enable development mode on your RocketChat server.

o	Generate personal access token by navigating to Profile -> My Account -> Personal Access Tokens and save them. (The tokens that will be generated are irrecoverable, once generated, you must save it in a safe place, if the token is lost or forgotten, you can regenerate or delete the token.)

o	Fill in details asked for by the script.
