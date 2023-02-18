#!/bin/bash
git pull

cd Website
npm i && npm run build
sudo rm /var/www/html/moodboard/* && sudo cp dist/* /var/www/html/moodboard/

cd ../Server
npm i
pm2 restart index.js
