import { NOT_FOUND, UNAUTHORIZED } from './defs.js'
import * as db from './db.js'

const handlers = {}
const setter = (p) => (_, k, v) => (handlers[`${p}/${k}`] = v)
const getter = (p) => (cache, k) => cache[k] || (cache[k] = ROUTE(`${p}/${k}`))
const ROUTE = (p) => new Proxy({}, { get: getter(p), set: setter(p) })

export const GET = ROUTE('GET/api')
export const POST = ROUTE('POST/api')

export const withUser = (fn) => async (params) => {
  if (!params.session) return new Response('No Session', UNAUTHORIZED)
  params.user = await db.get(params.session)
  if (!params.user) return new Response('Bad Session', UNAUTHORIZED)
  // ...maybe remove session cookie in that case
  return fn(params)
}

export const withBody = (fn, validation) => async ({ request, session }) => {
  const body = await request.json()
  const errors = {}
  for (let [name, item] of Object.entries(validation)) {
    const validError = item(body[name])
    if (validError !== true) errors[name] = validError
  }
  if (Object.keys(errors).length > 0)
    return new Response(JSON.stringify({ errors }), {
      status: 200,
      statusText: 'error',
      headers: { 'content-type': 'application/json' },
    })
  return fn({ body, session })
}

export const getCookie = (request, key) => {
  const cookieStr = request.headers.get('Cookie')
  if (!cookieStr) return undefined
  const x = cookieStr.indexOf(`${key}=`)
  if (x < 0) return
  const y = cookieStr.indexOf('; ', x)
  return cookieStr.slice(x + key.length + 1, y < x ? cookieStr.length : y)
}

export const handleRequest = async (request) => {
  const url = new URL(request.url)
  const handler = handlers[`${request.method}${url.pathname}`]
  if (!handler) return new Response(null, NOT_FOUND)
  const session = getCookie(request, 'nan-session')
  return handler({ request, url, session })
}
