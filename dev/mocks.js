import { STATUS_CODES } from 'http'

import '../api/auth.js'
import { handleRequest } from '../api/router.js'
import { getWranglerConfig } from './utils.js'

export const avatar = 'a'
export const login = 'tester'
export const email = 'dev@nan.ci'
export const name = 'Jean Patrick'
export const user = { sid: '4ytg', login, name }
export const config = await getWranglerConfig()
export const DOMAIN =
  process.env.DOMAIN || new URL(`https://${config.route}`).origin

Object.assign(globalThis, config.vars)

// ENV
globalThis.BOT_TOKEN = 'fake-bot-token'
globalThis.GITHUB_SECRET = 'fake-github-secret'
globalThis.DISCORD_SECRET = 'fake-discord-secret'

// KV
const NAN = (globalThis.NAN = { entries: {} })
NAN.getWithMetadata = async (key) => NAN.entries[key]
NAN.delete = (key) => NAN.entries[key] = undefined
NAN.put = async (key, value, op) => (NAN.entries[key] = { ...op, value, key })
NAN.list = async ({ prefix, limit = 1000 }) =>
  Object.entries(NAN.entries)
    .filter(([k]) => k.startsWith(prefix))
    .slice(0, limit)
    .map(([, v]) => v)

export const requests = {}
globalThis.fetch = async (url, request) => {
  const { body, status = 200 } = passToProvider(url, request)
  const text = typeof body === 'string' ? body : JSON.stringify(body)
  return {
    ok: true,
    text: async () => text,
    json: async () => JSON.parse(text),
    status,
    statusText: STATUS_CODES[status],
  }
}
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

const passToProvider = (url, request) => {
  // GITHUB token grant
  const method = request.method || 'GET'
  const history = requests[method] || (requests[method] = [])
  history.push({ url, request })

  if (url === 'https://github.com/login/oauth/access_token') {
    return { body: 'access_token=github-user-token' }
  }

  // GITHUB user data
  if (url === 'https://api.github.com/graphql') {
    const viewer = { id: 'MDQ6VXNlcjIzMTc0OA==', login, name }
    return { body: { data: { viewer } } }
  }

  // DISCORD token grant
  if (url === 'https://discordapp.com/api/oauth2/token') {
    const body = new URLSearchParams(request.body)

    return { body: { access_token: `discord-user-token-${body.get('code')}` } }
  }

  // DISCORD user data
  if (url === 'https://discordapp.com/api/users/@me') {
    const { Authorization } = request.headers || {}

    if (Authorization === 'Bearer discord-user-token-wesh') {
      return { body: { id: '13371337', avatar, email } }
    }

    if (Authorization === 'Bearer discord-user-token-already') {
      return { body: { id: '13381338', avatar, email } }
    }
  }

  // DISCORD join the guild
  if (
    method === 'PUT' &&
    url.startsWith(`https://discordapp.com/api/guilds/${GUILD}/members/`)
  ) {
    const discordId = url.slice(43 + GUILD.length)
    return { body: 'OK', status: discordId === '13381338' ? 204 : 201 }
  }

  // DISCORD update user in the guild
  if (url === `https://discordapp.com/api/guilds/${GUILD}/members/13381338`) {
    return { body: { nick: 'tester (Jean Patrick)' } }
  }

  // Unexpected request
  console.log({ url, request })
  throw Error('Unexpected Request')
}
