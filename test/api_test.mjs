import { GET, events } from './mock/cf-worker.mjs'
import { test, eq } from './runner.mjs'
import { rand, BAD_REQUEST, UNAUTHORIZED } from '../api/defs.mjs'
import * as db from '../api/db.mjs'

const _404 = new Response(null, { status: 404, statusText: 'Not Found' })
const login = 'tester'
const name = 'Jean Patrick'
const user = { sid: '4ytg', login, name }

// MOCKS
events.on('request', ({ url, request, respond }) => {
  // GITHUB token grant
  if (url === 'https://github.com/login/oauth/access_token') {
    eq(request, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GITHUB_CLIENT,
        client_secret: GITHUB_SECRET,
        state: 'proper-state',
        code: 'wesh',
      }).toString(),
    })
    return respond('access_token=github-user-token')
  }

  // GITHUB user data
  if (url === 'https://api.github.com/graphql') {
    eq(request, {
      method: 'POST',
      headers: {
        Authorization: 'bearer github-user-token',
        'User-Agent': 'nan-academy/nan-platform',
        'content-type': 'application/json',
      },
      body: '{"query":"{ viewer { login id name }}"}',
    })
    const viewer = { id: 'MDQ6VXNlcjIzMTc0OA==', login, name }
    return respond({ data: { viewer } })
  }

  // Unexpected request
  console.log({ url, request })
  respond(Error('Unexpected Request'))
})

// ROUTER
test('GET / -> 404', () => GET('/'), _404)
test('GET /wesh -> 404', () => GET('/wesh'), _404)

// GITHUB OAUTH
test('GET /auth/github without params').on(() =>
  GET('/auth/github'),
).expect = new Response(null, BAD_REQUEST)

test('GET /auth/github without bad state').on(() => {
  // if we don't have the state in the db return Unauthorized
  return GET('/auth/github?code=wesh&state=bad-state')
}).expect = new Response(null, UNAUTHORIZED)

test('GET /auth/github with a proper state').on(async ({ eq }) => {
  // set state in KV
  await NAN.put('github:proper-state', '', { metadata: {} })

  // init query
  const res = await GET('/auth/github?code=wesh&state=proper-state')
  const { status, headers } = res.options

  // expect a redirection
  eq({ body: res.body, status }, { body: null, status: 301 })
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
