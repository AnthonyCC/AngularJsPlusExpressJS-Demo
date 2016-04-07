setup:
1) npm install 
2) npm install -g gulp
3) npm install -g typings
4) cd server && typings install

build:
gulp build:server


start:
npm start

debug:
node-debug build/server.js