#!/bin/sh

[ ! -f node_modules/.bin/esbuild ] && npm install
export NODE_ENV="${NODE_ENV:-developement}"

while true; do
fdfind --extension js \
   | entr -cdr node dev/server.js
done
