import { STATUS_CODES } from 'http'

import { handleRequest } from '../api/router.js'
import { getWranglerConfig } from './utils.js'

globalThis.addEventListener = () => {}

await import('../api/server.js')

export const avatar = 'a'
export const login = 'tester'
export const email = 'dev@nan.ci'
export const name = 'Jean Patrick'
export const user = { login, name }
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
NAN.delete = (key) => (NAN.entries[key] = undefined)
NAN.put = async (key, value, op) => (NAN.entries[key] = { ...op, value, key })
NAN.list = async ({ prefix, limit = 1000 }) =>
  Object.entries(NAN.entries)
    .filter(([k]) => k.startsWith(prefix))
    .slice(0, limit)
    .map(([, v]) => v)

export const requests = {}
const getText = async (text) => {
  if (typeof text === 'string') return text
  let chunks = []
  text.setEncoding('utf8')
  for await (const data of text) chunks.push(data)
  return chunks.join('')
}

// MISSING: arrayBuffer, blob
const makeBody = (text) => ({
  text: async () => getText(text),
  json: async () => JSON.parse(await getText(text)),
})

globalThis.fetch = async (url, request = {}) => {
  request.method || (request.method = 'GET')
  const { body, status = 200 } = passToProvider(url, request)
  const text = typeof body === 'string' ? body : JSON.stringify(body)
  return {
    ok: true,
    status,
    statusText: STATUS_CODES[status],
    ...makeBody(text),
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

globalThis.Request = class Request {
  constructor(req) {
    this.headers = new Map(Object.entries(req.headers))
    this.url = `${DOMAIN}${req.url}`
    this.method = req.method
    Object.assign(this, makeBody(req.body || req))
  }
}

export const API = (pathname, request = {}) => {
  if (typeof pathname === 'object') {
    return handleRequest(new Request(pathname))
  }
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
    const { authorization } = request.headers || {}

    if (authorization === 'Bearer discord-user-token-wesh') {
      return { body: { id: '13371337', avatar, email } }
    }

    if (authorization === 'Bearer discord-user-token-already') {
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

  // DISCORD get user guild roles
  if (
    method === 'GET' &&
    url.startsWith(`https://discordapp.com/api/guilds/${GUILD}/members/`)
  ) {
    const discordId = url.slice(43 + GUILD.length)
    return { body: { user: { id: discordId }, roles: [] } }
  }

  // DISCORD update user in the guild
  if (url === `https://discordapp.com/api/guilds/${GUILD}/members/13381338`) {
    return { body: { nick: 'tester (Jean Patrick)' } }
  }

  // Unexpected request
  console.log({ url, request })
  throw Error('Unexpected Request')
}

export const sendResponse = ({ body, options, res, root, host }) => {
  res.statusCode = options.status
  const entries = Object.entries(options.headers || {})
  for (const [k, v] of entries) res.setHeader(k, v)

  // Default case, just return the body
  if (options.status < 300 || options.status > 399) return res.end(body)

  // Make cookies insecure for http support
  if (options.headers['set-cookie']) {
    const cookie = options.headers['set-cookie'].split('; ', 3).join('; ')
    res.setHeader('set-cookie', cookie)
  }

  // If it's a local redirection, we stop here
  if (options.headers.location[0] === '/') {
    res.setHeader('location', `${host || ''}${options.headers.location}`)
    return res.end(body)
  }

  // For OAuth we skip the provider and redirect back directly
  const redirect = { github_com: 'github', discordapp_com: 'discord' }
  const location = new URL(options.headers.location)
  const provider = redirect[location.hostname.replace('.', '_')]
  const state = location.searchParams.get('state')
  const path = `${root || '/'}api/auth/${provider}`
  res.setHeader('location', `${path}?code=wesh&state=${state}`)
  res.end(body)
}

// DOM
const start = Date.now()
globalThis.requestAnimationFrame = (fn) =>
  setTimeout(() => fn(Date.now() - start), 16)
globalThis.location = { href: `https://${config.route}` }
globalThis.window = globalThis
