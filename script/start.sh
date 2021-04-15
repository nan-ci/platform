#!/bin/sh

export NODE_ENV="${NODE_ENV:-developement}"

[ ! -f node_modules/.bin/esbuild ] && npm install

while true; do
  fd --extension js \
   | entr -cdr node dev/server.js
done
