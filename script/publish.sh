node_modules/.bin/esbuild api/server.js --bundle --format=esm --outfile=api/index.js
node_modules/.bin/wrangler publish
