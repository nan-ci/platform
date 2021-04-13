import { createServer, request } from 'http'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

// Start esbuild's server on a random local port
const { generate, serve, rootDir } = await import('./build.js')
const { host: hostname, port } = await serve()

// Set domain before we run the tests
const PORT = process.env.PORT || port + 1
process.env.DOMAIN = process.env.DOMAIN || `http://localhost:${PORT}`

// run tests
await (await import('./runner.js')).run()

// load CF worker mock
const { API } = await import('./mocks.js')

// load KV data
const db = join(rootDir, '.nan.kv.json')
NAN.entries = await readFile(db, 'utf8')
  .then(JSON.parse)
  .catch(() => ({}))

// Then start a proxy server on port 3000
const chunk = (_, i, h) => (i % 2 ? [] : [[h[i], h[i + 1]]])
createServer(async (req, res) => {
  const { url: path, method } = req
  const url = new URL(`${process.env.DOMAIN}${path}`)
  console.log(req.method, url.pathname, Object.fromEntries(url.searchParams))

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

  // Handle the root index
  if (url.pathname === '/') return res.end(await generate('index'))

  // Forward to the mock of cloudflare worker
  const headers = Object.fromEntries(req.rawHeaders.flatMap(chunk))
  const { body, options } = await API(path, { method, headers })

  // Save KV data
  await writeFile(db, JSON.stringify(NAN.entries), 'utf8')

  // Apply headers from the worker
  res.statusCode = options.status
  const entries = Object.entries(options.headers || {})
  for (const [k, v] of entries) res.setHeader(k, v)

  // Default case, just return the body
  if (options.status !== 301) return res.end(body)

  // Make cookies insecure for http support
  if (options.headers['Set-Cookie']) {
    const cookie = options.headers['Set-Cookie'].replace('; Secure', '')
    res.setHeader('Set-Cookie', cookie)
  }

  // If it's a local redirection, we stop here
  if (options.headers.Location[0] === '/') return res.end(body)

  // For OAuth we skip the provider and redirect back directly
  const redirect = { github_com: 'github', discordapp_com: 'discord' }
  const location = new URL(options.headers.Location)
  const provider = redirect[location.hostname.replace('.', '_')]
  const state = location.searchParams.get('state')
  res.setHeader('Location', `/api/auth/${provider}?code=wesh&state=${state}`)
  res.end(body)
}).listen(PORT, () => console.log(`Dev server ready on ${process.env.DOMAIN}`))
