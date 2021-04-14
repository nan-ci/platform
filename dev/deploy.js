import { readFileSync } from 'fs'
import { request } from 'https'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { buildSync } from 'esbuild'

import { getWranglerConfig, rootDir } from './utils.js'

const config = await getWranglerConfig()
const { account_id: account, name: script } = config
const CF_API = 'https://api.cloudflare.com/client/v4'
const url = `${CF_API}/accounts/${account}/workers/scripts/${script}`
const Authorization = `Bearer ${process.env.CF_DEPLOY_TOKEN}`
const headers = { Authorization, 'Content-Type': 'application/javascript' }

console.time('build')
const { outputFiles, warnings } = buildSync({
  entryPoints: [join(rootDir, 'api/server.js')],
  write: false,
  bundle: true,
  format: 'esm',
})
console.timeEnd('build')

console.time('upload')
const buf = Buffer.from(outputFiles[0].contents)
const res = await new Promise((s) =>
  request(url, { method: 'PUT', headers }, s).end(buf),
)
let body = ''
for await (const chunk of res.setEncoding('utf8')) body += chunk
const { success, errors } = JSON.parse(body)
const error = errors[0] || { message: 'Unknown error', code: 0 }
if (!success) throw Error(`${error.message} [${error.code}]`)
console.timeEnd('upload')
