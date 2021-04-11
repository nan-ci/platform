node_modules/.bin/esbuild app.jsx \
  --bundle \
  --define:process.env.NODE_ENV='"production"' \
  --format=esm \
  --minify \
  --splitting \
  --jsx-factory=h \
  --jsx-fragment=Fragment \
  --inject:lib/preact-shim.js \
  --outdir=public/js
