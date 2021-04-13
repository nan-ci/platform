#!/bin/sh

NODE_ENV="${NODE_ENV:-developement}"

[ ! -f node_modules/.bin/esbuild ] && npm install

fd --full-path '(/api|/dev)' \
 | entr -cdr node dev/server.js
