#!/bin/sh

export NODE_ENV="${NODE_ENV:-developement}"

[ ! -f node_modules/.bin/esbuild ] && npm install

fd --extension js \
 | entr -cdr node dev/server.js
