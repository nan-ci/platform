node_modules/.bin/esbuild app.jsx \
  --bundle \
  --define:process.env.NODE_ENV='"developement"' \
  --format=esm \
  --jsx-factory=h \
  --jsx-fragment=Fragment \
  --inject:lib/preact-shim-dev.js \
  --sourcemap=inline \
  --servedir=public \
  --outdir=public/js
