# RocketChat_Intent_Detection_App

Deploys a RocketChat server with a content filter that blocks messages with intent of direct contact and reports the details of the exchange to the "admin" channel.


1.	Clone the code from the repository

o	Find line 19 of the rocket.chat/docker-compose.yml file, which begins with ROOT_URL and put
ROOT_URL= (url where server is to be deployed)

2.	RocketChat server setup, run the following commands in the terminal: 

o	cd RocketChat_Intent_Detection_App

o	chmod u+x server_setup.sh

o	./server_setup.sh
  Prompts for details of the app,
  App name: direct-contact-detection
  rest can be filled in as desired

3.	Visit the url where the server is deployed (ROOT_URL) and setup your server and admin account:

o	Enable Apps development mode by navigating to Administration -> General then scroll down to Apps and click on the True radio button over the Enable development mode on your RocketChat server.

o	Create a private text channel named “admin”

4.	Deploying the app:

o	Run the following command in the terminal-
  meteor rc-apps deploy --url http://localhost:3000 --username <user_username> --password <user_password>

  --url should be the url where server is deployed (ROOT_URL)

  where, <user_username>=admin username and <user_password>=admin password
