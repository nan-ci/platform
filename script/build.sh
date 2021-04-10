esbuild app.jsx \
  --bundle \
  --define:process.env.NODE_ENV='"production"' \
  --format=esm \
  --minify \
  --splitting \
  --inject:lib/react-shim.js \
  --outdir=public/js
