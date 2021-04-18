#!/bin/sh

[ -n "${CF_DEPLOY_TOKEN:?}" ]
[ ! -f node_modules/.bin/esbuild ] && npm install
export NODE_ENV="${NODE_ENV:-production}"
node dev/deploy.js
