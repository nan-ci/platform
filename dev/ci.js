import { createServer } from 'https'
import { readFileSync, writeFileSync } from 'fs'
import { spawn, spawnSync } from 'child_process'
import { once } from 'events'

import { sendResponse } from './mocks.js'

/*
  every hours:
    - git fetch
    - cleanup stale database files (older than a week ?)

*/

const read = async (stream) => {
  stream.setEncoding('utf8')
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return chunks.join('')
}

const logToFile = (version, content) =>
  writeFileSync(`/var/log/nan/ci_${version}.log`, content, { flag: 'a' }) || content

const allowedHeaders = [
  'x-nan-cookie',
  'x-requested-with',
  'content-type',
  'origin',
  'accept',
].join(', ')

const handleRequest = async (req, res, again) => {
  const hash = req.url.split('/', 2)[1]
  const url = req.url.slice(41)
  const { method, headers } = req
  const version = headers.referer?.match(
    /https:\/\/([a-z0-9]{8})\.platform-nan-dev-8sl\.pages\.dev/,
  )?.[1]
  const env = { DOMAIN: `https://${version}.platform-nan-dev-8sl.pages.dev` }
  res.setHeader('access-control-allow-origin', version ? env.DOMAIN : '*')
  res.setHeader('access-control-allow-credentials', 'true')
  res.setHeader('access-control-allow-headers', allowedHeaders)
  res.setHeader(
    'access-control-allow-methods',
    'POST, GET, OPTIONS, DELETE, PATCH, PUT',
  )

  if (method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }

  if (!version || !hash || hash.length !== 40) {
    res.statusCode = 403
    return res.end()
  }

  console.log('running git checkout', hash, 'for version', version)
  const checkout = spawnSync('git', ['checkout', hash])
  again || logToFile(version, `\n[${method}] ${url}, ${JSON.stringify(headers)}\n`)
  if (checkout.status) {
    if (again) {
      res.statusCode = 404
      console.log(hash, 'not found')
      return res.end(`git checkout ${hash}: not found`)
    }

    console.log('running git fetch...')
    const fetch = spawnSync('git', ['fetch'])
    return handleRequest(req, res, true)
  }

  const session = headers['x-nan-cookie']
  const params = JSON.stringify({
    url,
    hash,
    method,
    headers: {
      cookie:
        session &&
        `nan-session=${session}; max-age=31536000; path=/; domain=${version}.platform-nan-dev-8sl.pages.dev; httponly; samesite=strict; secure`,
      ...headers,
    },
  })
  const page = spawn('node', ['dev/request-runner.js', params], { env })
  const stderr = read(page.stderr)
  const stdout = read(page.stdout)
  const [code] = await once(page, 'close')
  const logs = logToFile(version, await stderr)
  if (code) {
    res.statusCode = 500
    return res.end(logs)
  }

  const root = `https://${headers.host}/${hash}/`
  const host = env.DOMAIN
  const result = JSON.parse(logToFile(version, await stdout))
  sendResponse({ ...result, res, root, host })
  console.log(`response sent (hash: ${hash}, version: ${version}}`)
}

const servOpts = {
  cert: readFileSync('/etc/oct.ovh.crt'),
  key: readFileSync('/etc/oct.ovh.key'),
}

let pendingResponse
const server = createServer(servOpts, async (req, res) => {
  await pendingResponse
  pendingResponse = handleRequest(req, res).catch((err) => {
    res.statusCode = 500
    res.end(err.stack)
  })
}).listen(2083)
