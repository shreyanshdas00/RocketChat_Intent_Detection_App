#!/bin/bash
sudo apt install g++ build-essential git curl python-minimal
curl https://install.meteor.com/ | sh
meteor npm install -g @rocket.chat/apps-cli
meteor rc-apps create
cp -v App.ts direct-contact-detection/
cd direct-contact-detection
sudo rm DirectContactDetectionApp.ts
mv App.ts DirectContactDetectionApp.ts
cd ..
cd rocket.chat
docker-compose up -d
echo "Visit your RocketChat URL (http://localhost:3000), setup the server, generate access token and fill in the following details:" 
read -p "Enter Admin Username: "  username
read -p "Enter Admin Password: " password
curl -H "Content-type:application/json" \
     http://localhost:3000/api/v1/users.register \
     -d '{ "username": "$username", "email": "shreyanshdas00@gmail.com", "pass": "$password", "name": "Shreyansh Das"}'
read -p "Enter X-User-Id: "  xuser
read -p "Enter X-Auth-Token: "  xtoken
curl -H "X-Auth-Token: $xtoken" \
     -H "X-User-Id: $xuser" \
     -H "Content-type: application/json" \
     http://localhost:3000/api/v1/groups.create \
     -d '{ "name": "admin" }'
cd ..
cd direct-contact-detection
meteor rc-apps deploy --url http://localhost:3000 --username $username --password $password
