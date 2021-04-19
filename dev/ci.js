import { createServer } from 'https'
import { readFileSync, writeFileSync, createReadStream } from 'fs'
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

const logToFile = (hash, content) =>
  writeFileSync(`/tmp/nan-${hash}.log`, content, { flag: 'a' }) || content

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
  if (/^\/log(\?|\/)?/.test(url))
    return createReadStream(`/tmp/nan-${hash}.log`).pipe(res)
  const { method, headers } = req
  const version = headers.referer?.match(
    /https:\/\/([a-z0-9]{8})\.platform-nan-dev-8sl\.pages\.dev/,
  )?.[1]
  if (!version || !hash || hash.length !== 40) {
    res.statusCode = 403
    return res.end()
  }
  const env = { DOMAIN: `https://${version}.platform-nan-dev-8sl.pages.dev` }
  res.setHeader('access-control-allow-origin', version ? env.DOMAIN :'*')
  res.setHeader('access-control-allow-credentials', 'true')
  res.setHeader('access-control-allow-headers', allowedHeaders)

  if (method === 'options') {
    res.setHeader('allow', 'HEAD,GET,PUT,POST,PATCH,DELETE,OPTIONS')
    return res.end('OK')
  }

  console.log(method, url, { version, hash, headers })
  again || logToFile(hash, `\n[${method}] ${url}, ${JSON.stringify(headers)}\n`)
  const checkout = spawnSync('git', ['checkout', hash])
  if (checkout.status) {
    if (again) {
      res.statusCode = 404
      return res.end(`git checkout ${hash}: not found`)
    }

    const fetch = spawnSync('git', ['fetch'])
    return handleRequest(req, res, true)
  }

  const params = JSON.stringify({
    url,
    hash,
    method,
    headers: { ...headers, cookie: headers.cookie || headers['x-nan-cookie'] },
  })
  const page = spawn('node', ['dev/request-runner.js', params], { env })
  const stderr = read(page.stderr)
  const stdout = read(page.stdout)
  const [code] = await once(page, 'close')
  const logs = logToFile(hash, await stderr)
  if (code) {
    res.statusCode = 500
    return res.end(logs)
  }

  const root = `https://${headers.host}/${hash}/`
  const host = env.DOMAIN
  const result = JSON.parse(logToFile(hash, await stdout))
  console.log('->', result)
  console.error(logs)
  sendResponse({ ...result, res, root, host })
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
