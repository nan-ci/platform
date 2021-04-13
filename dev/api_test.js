import { GET, requests, DOMAIN, login, avatar, email, user } from './mocks.js'
import { roles } from '../data/discord.js'
import { test, eq } from './runner.js'
import { rand, BAD_REQUEST, UNAUTHORIZED } from '../api/defs.js'
import * as db from '../api/db.js'

const speciality = 'javascript'
const _404 = new Response(null, { status: 404, statusText: 'Not Found' })

/*
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

    eq(request, {
      method: 'POST',
      headers: {
        Authorization: 'bearer github-user-token',
        'User-Agent': 'nan-academy/nan-platform',
        'content-type': 'application/json',
      },
      body: '{"query":"{ viewer { login id name }}"}',
    })

    eq(request, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        scope: 'identify email guilds.join',
        client_id: DISCORD_CLIENT,
        client_secret: DISCORD_SECRET,
        grant_type: 'authorization_code',
        code: body.get('code'),
      }),
    })

    eq(request, {
      method: 'PUT',
      headers: {
        Authorization: 'Bot fake-bot-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        nick: 'tester (Jean Patrick)',
        access_token: `discord-user-token-${
          discordId === '13381338' ? 'already' : 'wesh'
        }`,
        roles: [ROLE, roles.javascript.id],
      }),
    })
    eq(request, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bot fake-bot-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        nick: 'tester (Jean Patrick)',
        access_token: `discord-user-token-already`,
        roles: [ROLE, roles.javascript.id],
      }),
    })
    */

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

test('GET /auth/github with a proper state').on(async () => {
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
    `domain=${new URL(DOMAIN).hostname}`,
    'path=/',
  ])

  // the user session is set in the database
  eq(NAN.entries[session.slice(12)]?.metadata, user)
})

test('GET /link/github generate a github link').on(async () => {
  // generate initial oauth query state
  const { body, options } = await GET('/link/github')

  // we should get a redirection
  eq({ body, status: options.status }, { body: null, status: 301 })
  const { searchParams, origin, pathname } = new URL(options.headers.Location)
  const { client_id, scope, state } = Object.fromEntries(searchParams)

  // validate that a session is creacted for the random given state
  eq(NAN.entries[`github:${state}`]?.expirationTtl, 3600)

  // confirm the rest of the params
  return { client_id, scope, origin, pathname }
}).expect = {
  client_id: GITHUB_CLIENT,
  origin: 'https://github.com',
  pathname: '/login/oauth/authorize',
  scope: 'user',
}

// DISCORD OAUTH
test('GET /auth/discord without params').on(() =>
  GET('/auth/discord'),
).expect = new Response('Missing Params', BAD_REQUEST)

test('GET /auth/discord without bad state').on(() => {
  // if we don't have the state in the db return Unauthorized
  return GET('/auth/discord?code=wesh&state=bad-state')
}).expect = new Response('Bad State', UNAUTHORIZED)

test('GET /auth/discord with a proper state').on(async () => {
  // set state in KV
  const name = 'user:4ytg:tester:knddr12r:test-disc'
  const metadata = { user, name, speciality }
  await NAN.put('discord:proper-state', '', { metadata })

  // init query
  const res = await GET('/auth/discord?code=wesh&state=proper-state')
  const { status, headers } = res.options

  // expect a redirect
  eq({ body: res.body, status }, { body: null, status: 301 })

  // location should include user own discordId
  const discordId = '13371337'
  const discordUser = { ...user, discordId, email, avatar, speciality }
  eq(headers.Location, `/?${new URLSearchParams(discordUser)}`)

  // the user session is set in the database
  eq(NAN.entries[name]?.metadata, discordUser)
})

test('GET /link/discord without a session is Unauthorized').on(() =>
  GET('/link/discord'),
).expect = new Response('No Session', {
  status: 401,
  statusText: 'Unauthorized',
})

test(
  'GET /link/discord with a session generate a state without a speciality',
).on(async () => {
  // This time, the user is connected, we can proceede
  const session = `user:4ytg:tester:${Date.now().toString(36)}:${rand()}`
  await db.set(session, user)
  return GET('/link/discord', { headers: { Cookie: `nan-session=${session}` } })
}).expect = new Response('Missing Speciality', BAD_REQUEST)

test('GET /link/discord with a session generate a state').on(async () => {
  // This time, the user is connected, we can proceede
  const session = `user:4ytg:tester:${Date.now().toString(36)}:${rand()}`
  await db.set(session, user)
  const { body, options } = await GET('/link/discord?speciality=javascript', {
    headers: { Cookie: `nan-session=${session}` },
  })

  // we should get a redirection
  eq({ body, status: options.status }, { body: null, status: 301 })
  const { searchParams, origin, pathname } = new URL(options.headers.Location)
  const { client_id, scope, state } = Object.fromEntries(searchParams)

  // validate that a session is creacted for the random given state
  // we store the users credentials here to avoid doing 2 queries afterward.
  // It both check that the state is valid and return relevant user info.
  eq(NAN.entries[`discord:${state}`], {
    expirationTtl: 3600,
    value: '',
    key: `discord:${state}`,
    metadata: { name: session, user, speciality },
  })

  // confirm the rest of the params
  return { client_id, scope, origin, pathname }
}).expect = {
  client_id: DISCORD_CLIENT,
  origin: 'https://discordapp.com',
  pathname: '/api/oauth2/authorize',
  scope: 'identify email guilds.join',
}

test('GET /auth/discord with a proper state').on(async () => {
  // set state in KV
  const name = 'user:4ytg:tester:knddr12r:test-exist'
  const metadata = { user, name, speciality }
  await NAN.put('discord:exists-state', '', { metadata })

  // init query
  const res = await GET('/auth/discord?code=already&state=exists-state')
  const { status, headers } = res.options

  // expect a redirect
  eq({ body: res.body, status }, { body: null, status: 301 })

  // location should include user own discordId
  const discordId = '13381338'
  const discordUser = { ...user, discordId, email, avatar, speciality }
  eq(headers.Location, `/?${new URLSearchParams(discordUser)}`)

  // if user already exists in discord we expect to have
  // another PATCH request made to discord servers
  const expectedUrl = `https://discordapp.com/api/guilds/${GUILD}/members/13381338`
  const guildUpdate = requests.PATCH?.find(({ url }) => url.endsWith(expectedUrl))
  eq(guildUpdate?.url, expectedUrl, 'patch request missing')

  // the user session is set in the database
  eq(NAN.entries[name]?.metadata, discordUser)
})
