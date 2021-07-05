import { GET, requests, DOMAIN, POST, user } from './mocks.js'
import { rand, BAD_REQUEST, UNAUTHORIZED } from '../api/defs.js'
// import { roles } from '../data/discord.js'
import * as db from '../api/db.js'
import { eq } from './utils.js'

export const o = {}

const speciality = 'javascript'
const _404 = new Response(null, { status: 404, statusText: 'Not Found' })
const { hostname } = new URL(DOMAIN)
const body = { username: 'ramseycoder' }

o['POST /user/profile with session and no body'] = {
  it: async () => {
    const session = `user:tester:${Date.now().toString(36)}:${rand()}`
    await db.set(session, user)
    return await POST('/user/profile', {
      headers: { cookie: `nan-session=${session}` },
      body: null,
    })
  },
  is: new Response('Missing body', BAD_REQUEST),
}

o['POST /user/profile with session and body'] = {
  it: async () => {
    const session = `user:tester:${Date.now().toString(36)}:${rand()}`
    await db.set(session, user)
    return await POST('/user/profile', {
      headers: { cookie: `nan-session=${session}` },
      body: JSON.stringify(body),
    })
  },
  is: new Response('ok all is set', { status: 200 }),
}

// // ROUTER
// o['GET / -> 404'] = { it: () => GET('/'), is: _404 }
// o['GET /wesh -> 404'] = { it: () => GET('/wesh'), is: _404 }

// // GITHUB OAUTH
// o['GET /auth/github without params'] = {
//   it: () => GET('/auth/github'),
//   is: new Response(null, BAD_REQUEST),
// }

// o['GET /auth/github without bad state'] = {
//   is: new Response(null, UNAUTHORIZED),
//   it: () => {
//     // if we don't have the state in the db return Unauthorized
//     return GET('/auth/github?code=wesh&state=bad-state')
//   },
// }

// o['GET /auth/github with a proper state'] = {
//   it: async () => {
//     // set state in KV
//     await NAN.put('github:proper-state', '', { metadata: {} })

//     // init query
//     const res = await GET('/auth/github?code=wesh&state=proper-state')
//     const { status, headers } = res.options

//     // expect a redirection
//     eq({ body: res.body, status }, { body: null, status: 301 })
//     eq(headers.location, `/learningchoice?${new URLSearchParams(user)}`)
//     const [session, ...parts] = headers['set-cookie'].split('; ')
//     eq(session.startsWith('nan-session=user:tester:'), true)
//     eq(
//       parts.sort(),
//       [
//         'httponly',
//         'max-age=31536000',
//         'samesite=strict',
//         'secure',
//         `domain=${hostname}`,
//         'path=/',
//       ].sort(),
//     )

//     // the user session is set in the database
//     eq(NAN.entries[session.slice(12)]?.metadata, user)
//   },
// }

// o['GET /link/github generate a github link'] = {
//   it: async () => {
//     // generate initial oauth query state
//     const { body, options } = await GET('/link/github')

//     // we should get a redirection
//     eq({ body, status: options.status }, { body: null, status: 301 })
//     const { searchParams, origin, pathname } = new URL(options.headers.location)
//     const { client_id, scope, state } = Object.fromEntries(searchParams)

//     // validate that a session is creacted for the random given state
//     eq(NAN.entries[`github:${state}`]?.expirationTtl, 3600)

//     // confirm the rest of the params
//     return { client_id, scope, origin, pathname }
//   },
//   is: {
//     client_id: GITHUB_CLIENT,
//     origin: 'https://github.com',
//     pathname: '/login/oauth/authorize',
//     scope: 'user',
//   },
// }

// // DISCORD OAUTH
// o['GET /auth/discord without params'] = {
//   it: () => GET('/auth/discord'),
//   is: new Response('Missing Params', BAD_REQUEST),
// }

// o['GET /auth/discord without bad state'] = {
//   it: () => {
//     // if we don't have the state in the db return Unauthorized
//     return GET('/auth/discord?code=wesh&state=bad-state')
//   },
//   is: new Response('Bad State', UNAUTHORIZED),
// }

// o['GET /auth/discord with a proper state'] = {
//   it: async () => {
//     // set state in KV
//     const name = 'user:tester:knddr12r:test-disc'
//     const metadata = { user, name, speciality }
//     await NAN.put('discord:proper-state', '', { metadata })

//     // init query
//     const res = await GET('/auth/discord?code=wesh&state=proper-state')
//     const { status, headers } = res.options

//     // expect a redirect
//     eq({ body: res.body, status }, { body: null, status: 301 })

//     // location should include user own discordId
//     const discordId = '13371337'
//     const discordUser = { ...user, discordId, email, avatar, speciality }
//     eq(headers.location, `/?${new URLSearchParams(discordUser)}`)

//     // the user session is set in the database
//     eq(NAN.entries[name]?.metadata, discordUser)
//   },
// }

// o['GET /link/discord without a session is Unauthorized'] = {
//   it: () => GET('/link/discord'),
//   is: new Response('No Session', {
//     status: 401,
//     statusText: 'Unauthorized',
//   }),
// }

// o['GET /link/discord with a session generate a state without a speciality'] = {
//   it: async () => {
//     // This time, the user is connected, we can proceede
//     const session = `user:tester:${Date.now().toString(36)}:${rand()}`
//     await db.set(session, user)
//     return GET('/link/discord', {
//       headers: { cookie: `nan-session=${session}` },
//     })
//   },
//   is: new Response('Missing Speciality', BAD_REQUEST),
// }

// o['GET /link/discord with a session generate a state'] = {
//   it: async () => {
//     // This time, the user is connected, we can proceede
//     const session = `user:tester:${Date.now().toString(36)}:${rand()}`
//     await db.set(session, user)
//     const { body, options } = await GET('/link/discord?speciality=javascript', {
//       headers: { cookie: `nan-session=${session}` },
//     })

//     // we should get a redirection
//     eq({ body, status: options.status }, { body: null, status: 301 })
//     const { searchParams, origin, pathname } = new URL(options.headers.location)
//     const { client_id, scope, state } = Object.fromEntries(searchParams)

//     // validate that a session is creacted for the random given state
//     // we store the users credentials here to avoid doing 2 queries afterward.
//     // It both check that the state is valid and return relevant user info.
//     eq(NAN.entries[`discord:${state}`], {
//       expirationTtl: 3600,
//       value: '',
//       key: `discord:${state}`,
//       metadata: { name: session, user, speciality },
//     })

//     // confirm the rest of the params
//     return { client_id, scope, origin, pathname }
//   },
//   is: {
//     client_id: DISCORD_CLIENT,
//     origin: 'https://discordapp.com',
//     pathname: '/api/oauth2/authorize',
//     scope: 'identify email guilds.join',
//   },
// }

// o['GET /auth/discord with a proper state'] = {
//   it: async () => {
//     // set state in KV
//     const name = 'user:tester:knddr12r:test-exist'
//     const metadata = { user, name, speciality }
//     await NAN.put('discord:exists-state', '', { metadata })

//     // init query
//     const res = await GET('/auth/discord?code=already&state=exists-state')
//     const { status, headers } = res.options

//     // expect a redirect
//     eq({ body: res.body, status }, { body: null, status: 301 })

//     // location should include user own discordId
//     const role = 'visitor'
//     const discordId = '13381338'
//     const discordUser = { ...user, discordId, email, avatar, speciality, role }
//     eq(headers.location, `/?${new URLSearchParams(discordUser)}`)

//     // if user already exists in discord we expect to have
//     // another PATCH request made to discord servers
//     const expectedUrl = `https://discordapp.com/api/guilds/${GUILD}/members/13381338`
//     const guildUpdate = requests.PATCH?.find(({ url }) =>
//       url.endsWith(expectedUrl),
//     )
//     eq(guildUpdate?.url, expectedUrl, 'patch request missing')

//     // the user session is set in the database
//     eq(NAN.entries[name]?.metadata, discordUser)
//   },
// }

// o['GET /logout'] = {
//   it: () => GET('/logout'),
//   is: new Response(null, {
//     status: 301,
//     headers: {
//       'set-cookie': `nan-session=; path=/; domain=${hostname}; max-age=-1`,
//       location: '/login',
//     },
//   }),
// }

// o['GET /logout with stored session'] = {
//   it: async () => {
//     const session = `user:tester:${Date.now().toString(36)}:${rand()}`
//     await db.set(session, {})
//     const headers = { cookie: `nan-session=${session}` }
//     await GET('/logout', { headers })
//     return NAN.entries[session]
//   },
// }
