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
read -p "Enter Admin Username: "  username
read -s -p "Enter Admin Password: " password
read -p "Enter X-User-Id: "  xuser
read -p "Enter X-Auth-Token: "  xtoken
curl -H "X-Auth-Token: $xtoken" \
     -H "X-User-Id: $xuser" \
     -H "Content-type: application/json" \
     http://localhost:3000/api/v1/groups.create \
     -d '{ "name": "admin" }'
cd ..
cd direct-contact-detection
rc-apps deploy --url http://localhost:3000 --username $username --password $password
