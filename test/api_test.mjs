import { GET, next } from './mock/cf-worker.mjs'
import { test } from './runner.mjs'

const _404 = new Response(null, { status: 404, statusText: 'Not Found' })
const _401 = new Response(null, { status: 401, statusText: 'Unauthorized' })
const _400 = new Response(null, { status: 400, statusText: 'Bad Request' })

// ROUTER
test('GET / -> 404', () => GET('/'), _404)
test('GET /wesh -> 404', () => GET('/wesh'), _404)

// GITHUB OAUTH
test('GET /auth/github without params').on(() =>
  GET('/auth/github'),
).expect = _400

test('GET /auth/github without bad state').on(() => {
  // if we don't have the state in the db return Unauthorized
  return GET('/auth/github?code=wesh&state=bad-state')
}).expect = _401

test('GET /auth/github with a proper state').on(async ({ eq }) => {
  // set state in KV
  await NAN.put('github:proper-state', '', { metadata: {} })

  // init query
  const res = GET('/auth/github?code=wesh&state=proper-state')

  // intercept github post request
  const secretQuery = await next()
  eq(secretQuery.request, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '07957ad810a70e99d67c',
      client_secret: GITHUB_SECRET,
      state: 'proper-state',
      code: 'wesh',
    }).toString(),
  })

  // reply with secret token
  secretQuery.resolve({ text: async () => 'access_token=super-secret-token' })

  // intercept github user query
  const userQuery = await next()

  // reply with user info
  const login = 'tester'
  const name = 'Jean Patrick'
  const viewer = { id: 'MDQ6VXNlcjIzMTc0OA==', login, name }
  userQuery.resolve({ text: async () => JSON.stringify({ data: { viewer } }) })

  // check that
  const { status, headers } = (await res).options
  const user = { sid: '4ytg', login, name }
  eq(status, 301)
  eq(headers.Location, `/?${new URLSearchParams(user)}`)
  const [session, ...parts] = headers['Set-Cookie'].split('; ')
  eq(session.startsWith('nan-session=user:4ytg:tester:'), true)
  eq(parts.sort(), [
    'HttpOnly',
    'SameSite=Strict',
    'Secure',
    'domain=nan.oct.ovh',
    'path=/',
  ])

  // the user session is set in the database
  eq(NAN.entries[session.slice(12)]?.metadata, user)
})

// DISCORD OAUTH
