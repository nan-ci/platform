#!/bin/sh

[ ! -f node_modules/.bin/esbuild ] && npm install
export NODE_ENV="${NODE_ENV:-developement}"
node dev/test-runner.js
