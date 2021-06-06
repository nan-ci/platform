import { BAD_REQUEST, UNAUTHORIZED, TYPE_JSON, INTERNAL, rand } from './defs.js'
import { specialities, roles, rolesByKey } from '../data/discord.js'
import { GET, withUser } from './router.js'
import * as db from './db.js'

const gql = async (query) => {
  const text = await query.text()
  try {
    const { data, errors } = JSON.parse(text)
    return { data, error: errors && errors[0].message }
  } catch {
    return { error: text }
  }
}

const DISCORD = 'https://discordapp.com/api'
const joinGuild = async ({ discordId, request, body }) => {
  const url = `${DISCORD}/guilds/${GUILD}/members/${discordId}`
  const join = await fetch(url, { ...request, body: JSON.stringify(body) })
  if (join.status !== 204) return { reply: join, roles: body.roles }
  const user = await (await fetch(url)).json()
  body.roles = [...new Set([...user.roles, ...body.roles])]
  request.method = 'PATCH'
  const reply = await fetch(url, { ...request, body: JSON.stringify(body) })
  return { reply, roles: body.roles }
}

GET.auth.discord = async ({ url }) => {
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (!code || !state) return new Response('Missing Params', BAD_REQUEST)
  const session = await db.get(`discord:${state}`)
  if (!session?.user) return new Response('Bad State', UNAUTHORIZED)
  const authResponse = await fetch(`${DISCORD}/oauth2/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      scope: 'identify email guilds.join',
      client_id: DISCORD_CLIENT,
      client_secret: DISCORD_SECRET,
      grant_type: 'authorization_code',
      code,
    }),
  })

  const auth = await authResponse.json()
  if (auth.error) return new Response(auth.error_description, BAD_REQUEST)
  const userResponse = await fetch(`${DISCORD}/users/@me`, {
    headers: { authorization: `Bearer ${auth.access_token}` },
  })
  const { speciality } = session
  const { id: discordId, email, avatar } = await userResponse.json()
  const user = { ...session.user, discordId, email, avatar, speciality }

  // join discord server
  const join = await joinGuild({
    discordId,
    request: {
      method: 'PUT',
      headers: { authorization: `Bot ${BOT_TOKEN}`, ...TYPE_JSON },
    },
    body: {
      nick:
        user.name && user.name !== user.login
          ? `${user.login} (${user.name})`
          : user.login,
      access_token: auth.access_token,
      roles: [rolesByKey.student.id, specialities[speciality].id],
    },
  })

  join.reply.ok || console.error('Unable to join discord:', join.reply)
  user.role = roles.find((r) => join.roles.includes(r.id))?.key || 'student'
  const pendingUpdate = db.set(session.name, user)
  const location = `/?${new URLSearchParams(user)}`
  return new Response(null, { headers: { location }, status: 301 })
}

GET.auth.github = async ({ url: { searchParams, hostname } }) => {
  const state = searchParams.get('state')
  const code = searchParams.get('code')
  if (!state || !code) return new Response(null, BAD_REQUEST)
  const access = await db.get(`github:${state}`)
  if (!access) return new Response(null, UNAUTHORIZED)

  // get github token
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: String(
      new URLSearchParams({
        client_id: GITHUB_CLIENT,
        client_secret: GITHUB_SECRET,
        state, // is the state needed here ?
        code,
      }),
    ),
  })

  const authBody = new URLSearchParams(await res.text())
  const token = authBody.get('access_token')

  if (authBody.get('error')) {
    return new Response(authBody.get('error_description'), BAD_REQUEST)
  }

  // get github user data from the token
  const query = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `bearer ${token}`,
      'user-agent': 'nan-academy/nan-platform',
      ...TYPE_JSON,
    },
    body: JSON.stringify({ query: '{ viewer { login id name }}' }),
  })

  const { data, error } = await gql(query)
  if (error) return new Response(error, INTERNAL)

  // create the user session
  const { id, name } = data.viewer
  let { session } = (await db.get(`github-id:${id}`)) || {}
  let user
  if (session) {
    user = await db.get(session)
  } else {
    const { login } = data.viewer
    session = `user:${login}:${Date.now().toString(36)}:${rand()}`
    user = { login, name }
    await Promise.all([
      db.set(`github-id:${id}`, { session }),
      db.set(session, user),
    ])
  }
  return new Response(null, {
    status: 301,
    headers: {
      location: `/?${new URLSearchParams(user)}`,
      'set-cookie': [
        `nan-session=${session}`,
        'max-age=31536000',
        'path=/',
        `domain=${hostname}`,
        'httponly',
        'samesite=strict',
        'secure',
      ].join('; '),
    },
  })
}

const oauth2Url = (url, args) => `https://${url}?${new URLSearchParams(args)}`
GET.link.discord = withUser(async ({ user, session, url }) => {
  const speciality = url.searchParams.get('speciality')
  if (!specialities[speciality])
    return new Response('Missing Speciality', BAD_REQUEST)
  const state = `${rand()}-${rand()}`
  const metadata = { user, name: session, speciality }
  await db.put(`discord:${state}`, '', { expirationTtl: 3600, metadata })
  const location = oauth2Url('discordapp.com/api/oauth2/authorize', {
    client_id: DISCORD_CLIENT,
    response_type: 'code',
    scope: 'identify email guilds.join',
    state,
  })
  return new Response(null, { headers: { location }, status: 301 })
})

GET.link.github = async () => {
  const state = `${rand()}-${rand()}`
  await db.put(`github:${state}`, '', { expirationTtl: 3600, metadata: {} })
  const location = oauth2Url('github.com/login/oauth/authorize', {
    client_id: GITHUB_CLIENT,
    scope: 'user',
    state,
  })
  return new Response(null, { headers: { location }, status: 301 })
}

GET.logout = async ({ session, url: { hostname } }) => {
  // Clear Session
  session && (await db.del(session))

  // Clear cookie
  const cookie = `nan-session=; path=/; domain=${hostname}; max-age=-1`
  return new Response(null, {
    status: 301,
    headers: { location: '/login', 'set-cookie': cookie },
  })
}
