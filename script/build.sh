esbuild app.jsx \
  --bundle \
  --define:process.env.NODE_ENV='"production"' \
  --format=esm \
  --inject:lib/react-shim.js \
  --outdir=public/js
