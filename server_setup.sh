#!/bin/bash
sudo apt install g++ build-essential git curl python-minimal
curl https://install.meteor.com/ | sh
meteor npm install -g @rocket.chat/apps-cli
meteor rc-apps create
cp -v App.ts /direct-contact/
cd direct-contact
sudo rm DirectContactApp.ts
mv App.ts DirectContactApp.ts
cd ..
cd rocket.chat
docker-compose up -d