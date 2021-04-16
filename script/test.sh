#!/bin/sh

export NODE_ENV="${NODE_ENV:-developement}"

[ ! -f node_modules/.bin/esbuild ] && npm install

node dev/runner.js
