import { createServer } from 'https'
import { readFileSync } from 'fs'
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

const handleRequest = async (req, res, again) => {
  const hash = req.url.split('/', 2)[1]
  const version = req.headers.referer?.match(
    /https:\/\/([a-z0-9]{8})\.platform-au0l\.pages\.dev/,
  )?.[1]
  if (!version || !hash || hash.length !== 40) {
    res.statusCode = 403
    return res.end()
  }
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )

  const url = req.url.slice(41)
  console.log(req.method, url, { version, hash })
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
    method: req.method,
    rawHeaders: req.rawHeaders,
  })
  // TODO specify the right `DOMAIN`
  const env = { DOMAIN: `https://${hash}.platform-au0l.pages.dev` }
  const page = spawn('node', ['dev/request-runner.js', params], { env })
  const stderr = read(page.stderr)
  const stdout = read(page.stdout)
  const [code] = await once(page, 'close')
  if (code) {
    res.statusCode = 500
    return res.end(await stderr)
  }
  sendResponse({ ...JSON.parse(await stdout), res, hash })
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
