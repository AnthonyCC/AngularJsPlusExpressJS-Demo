setup:
1) npm install 
2) npm install -g gulp
3) npm install -g typings
4) cd server && typings install


search for a typing definiton:
typings search <name>

install a typing definiton:
typings install <name> --ambient --save

debug:
DEBUG=routes:index npm start


build:
//local dev
gulp build:server
// deployment
NODE_ENV='dev' gulp build
NODE_ENV='qa' gulp build
NODE_ENV='prod' gulp build

start:
npm start

debug:
node-debug build/server.js

watch mode (which auto rebuild and restart node)
NODE_ENV='dev' gulp