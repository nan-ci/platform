import { createServer, request } from 'http'
import { readFile, writeFile } from 'fs/promises'
import { join, extname } from 'path'
import mime from 'mime'

import { rootDir } from './utils.js'

// Start esbuild's server on a random local port
const { generate, serve } = await import('./build.js')
const { host: hostname, port } = await serve()

// Set domain before we run the tests
const PORT = process.env.PORT || port + 1
process.env.DOMAIN = process.env.DOMAIN || `http://localhost:${PORT}`

// run tests
await (await import('./test-runner.js')).run()

// load CF worker mock
const { API, sendResponse } = await import('./mocks.js')

// load KV data
const db = join(rootDir, '.nan.kv.json')
NAN.entries = await readFile(db, 'utf8')
  .then(JSON.parse)
  .catch(() => ({}))

// Then start a proxy server on port 3000
createServer(async (req, res) => {
  const { url: path, method } = req
  const url = new URL(`${process.env.DOMAIN}${path}`)

  if (path.startsWith('/js/')) {
    // Forward each incoming request to esbuild
    const options = { port, method, hostname, path, headers: req.headers }
    const proxyReq = request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res, { end: true })
    })

    // Forward the body of the request to esbuild
    return req.pipe(proxyReq, { end: true })
  }

  if (path.startsWith('/assets/')) {
    const file = await readFile(join(rootDir, 'public', path))
    res.writeHead(200, { 'Content-Type': mime.getType(extname(path)) })
    return res.end(file)
  }
  // Handle the root index
  if (!url.pathname.startsWith('/api/')) return res.end(await generate('index'))

  // Forward to the mock of cloudflare worker
  const { body, options } = await API(req)

  // Save KV data
  await writeFile(db, JSON.stringify(NAN.entries), 'utf8')

  // Apply headers from the worker
  sendResponse({ body, options, res })
}).listen(PORT, () => console.log(`Dev server ready on ${process.env.DOMAIN}`))
