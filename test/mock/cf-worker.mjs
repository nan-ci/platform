// mock cloudflare worker API:
import { EventEmitter, once } from 'events'
import API from '../../api/server.mjs'

const events = new EventEmitter()

// ENV
globalThis.GITHUB_SECRET = 'fake-test-secret'

// KV
const NAN = (globalThis.NAN = { entries: {} })
NAN.getWithMetadata = async (key) => NAN.entries[key]
NAN.put = async (key, value, op) => (NAN.entries[key] = { ...op, value, key })
NAN.list = async ({ prefix, limit = 1000 }) =>
  Object.entries(NAN.entries)
    .filter(([k]) => k.startsWith(prefix))
    .slice(0, limit)
    .map(([, v]) => v)

globalThis.fetch = (url, request) =>
  new Promise((resolve, reject) => {
    events.once('error', reject)
    events.emit('request', { url, request, reject, resolve })
  })

export const next = async () => (await once(events, 'request'))[0]

globalThis.atob = (s) => new Buffer.from(s, 'base64').toString('binary')
globalThis.btoa = (s) => new Buffer.from(s).toString('base64')
globalThis.addEventListener = (key, fn) => events.on(key, fn)
globalThis.Response = class Response {
  constructor(body, options) {
    this.body = body
    this.options = options
  }
}

const env = {}
export const GET = (pathname, request = {}) => {
  const headers = new Map(Object.entries(request.headers || {}))
  const url = `https://localhost/api${pathname}`
  return API.fetch({ url, method: 'GET', ...request, headers }, env)
}

export const POST = (pathname, p) => GET(pathname, { method: 'POST', ...p })
