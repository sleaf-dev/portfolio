#!/usr/bin bash

npm i
npm run build
docker compose --up -d --build