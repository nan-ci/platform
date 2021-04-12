node_modules/.bin/esbuild api/server.mjs --bundle --format=esm --outfile=api/index.js
node_modules/.bin/wrangler publish
