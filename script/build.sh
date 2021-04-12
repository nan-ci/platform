export NODE_ENV="${NODE_ENV:-production}"

node script/generate-templates.mjs
node_modules/.bin/esbuild app.jsx \
  --bundle \
  --define:process.env.NODE_ENV='"'"$NODE_ENV"'"' \
  --format=esm \
  --jsx-factory=h \
  --jsx-fragment=Fragment \
  --inject:lib/preact-shim.js \
  --outdir=public/js \
  --splitting \
  --minify
