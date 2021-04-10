esbuild app.jsx \
  --bundle \
  --define:process.env.NODE_ENV='"developement"' \
  --format=esm \
  --inject:lib/react-shim.js \
  --servedir=public \
  --outdir=public/js
