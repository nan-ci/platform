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
const { outputFiles: [out], warnings } = buildSync({
  entryPoints: [join(rootDir, 'api/server.js')],
  write: false,
  bundle: true,
  format: 'esm',
})
console.timeEnd('build')

console.time('upload')
const res = await new Promise((s) =>
  request(url, { method: 'PUT', headers }, s).end(out.contents),
)
let body = ''
for await (const chunk of res.setEncoding('utf8')) body += chunk
const { success, errors: [error] } = JSON.parse(body)
if (!success) throw Error(`${error.message} [${error.code}]`)
console.timeEnd('upload')
