#!/bin/sh

export NODE_ENV="${NODE_ENV:-production}"

[ -n "${CF_DEPLOY_TOKEN:?}" ]
[ ! -f node_modules/.bin/esbuild ] && npm install

node dev/deploy.js
