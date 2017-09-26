
#bash

# clear old files
rm -rf ./dist

# start compilation
./node_modules/.bin/babel ./server --out-dir ./dist && cd ./dist

# start server
node ./server.js

# clear trash
# rm -rf ./upload*
