export NODE_ENV="${NODE_ENV:-developement}"

node script/generate-templates.js
node_modules/.bin/esbuild app.jsx \
  --bundle \
  --define:process.env.NODE_ENV='"'"$NODE_ENV"'"' \
  --format=esm \
  --jsx-factory=h \
  --jsx-fragment=Fragment \
  --inject:lib/preact-shim-dev.js \
  --outdir=public/js \
  --sourcemap=inline \
  --servedir=public
