#!/bin/sh

export NODE_ENV="${NODE_ENV:-production}"

[ ! -f node_modules/.bin/esbuild ] && npm install

node dev/build.js
