// mock cloudflare worker API:
import { EventEmitter, once } from 'events'
import { readFileSync } from 'fs'
import { STATUS_CODES } from 'http'

import TOML from 'fast-toml'

import '../api/auth.js'
import { handleRequest } from '../api/router.js'

export const name = 'Jean Patrick'
export const login = 'tester'
export const email = 'dev@nan.ci'
export const avatar = 'a'
export const user = { sid: '4ytg', login, name }
export const events = new EventEmitter()
export const config = TOML.parse(readFileSync('wrangler.toml'))
export const DOMAIN =
  process.env.DOMAIN || new URL(`https://${config.route.slice(0, -1)}`).href

Object.assign(globalThis, config.vars)

// ENV
globalThis.BOT_TOKEN = 'fake-bot-token'
globalThis.GITHUB_SECRET = 'fake-github-secret'
globalThis.DISCORD_SECRET = 'fake-discord-secret'

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
    const respond = (body, status = 200) => {
      events.removeListener('error', reject)
      const ok = !(body instanceof Error)
      if (!ok) return reject(body)
      const text = typeof body === 'string' ? body : JSON.stringify(body)
      resolve({
        ok,
        text: async () => text,
        json: async () => JSON.parse(text),
        status,
        statusText: STATUS_CODES[status],
      })
    }

    events.emit('request', { url, request, respond })
  })

globalThis.atob = (s) => new Buffer.from(s, 'base64').toString('binary')
globalThis.btoa = (s) => new Buffer.from(s).toString('base64')
globalThis.Response = class Response {
  constructor(body, options) {
    this.body = body
    this.options = options
  }
}

export const API = (pathname, request = {}) => {
  const headers = new Map(Object.entries(request.headers || {}))
  const url = `${DOMAIN}${pathname}`
  return handleRequest({ url, method: 'GET', ...request, headers })
}
export const GET = (path, p) => API(`/api${path}`, { method: 'GET', ...p })
export const POST = (path, p) => API(`/api${path}`, { method: 'POST', ...p })

events.on('request', ({ url, request, respond }) => {
  // GITHUB token grant
  const method = request.method || 'GET'
  const history = events[method] || (events[method] = [])
  history.push({ url, request })

  if (url === 'https://github.com/login/oauth/access_token') {
    return respond('access_token=github-user-token')
  }

  // GITHUB user data
  if (url === 'https://api.github.com/graphql') {
    const viewer = { id: 'MDQ6VXNlcjIzMTc0OA==', login, name }
    return respond({ data: { viewer } })
  }

  // DISCORD token grant
  if (url === 'https://discordapp.com/api/oauth2/token') {
    const body = new URLSearchParams(request.body)

    return respond({ access_token: `discord-user-token-${body.get('code')}` })
  }

  // DISCORD user data
  if (url === 'https://discordapp.com/api/users/@me') {
    const { Authorization } = request.headers || {}

    if (Authorization === 'Bearer discord-user-token-wesh') {
      return respond({ id: '13371337', avatar, email })
    }

    if (Authorization === 'Bearer discord-user-token-already') {
      return respond({ id: '13381338', avatar, email })
    }
  }

  // DISCORD join the guild
  if (
    method === 'PUT' &&
    url.startsWith(`https://discordapp.com/api/guilds/${GUILD}/members/`)
  ) {
    const discordId = url.slice(43 + GUILD.length)
    return respond('OK', discordId === '13381338' ? 204 : 201)
  }

  // DISCORD update user in the guild
  if (url === `https://discordapp.com/api/guilds/${GUILD}/members/13381338`) {
    return respond({ nick: 'tester (Jean Patrick)' })
  }

  // Unexpected request
  console.log({ url, request })
  respond(Error('Unexpected Request'))
})
