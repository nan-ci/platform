import { BAD_REQUEST, UNAUTHORIZED, TYPE_JSON, INTERNAL, rand } from './defs.js'
import { specialities, roles, rolesByKey } from '../data/discord.js'
import { GET, POST, withUser } from './router.js'
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

const checkMember = async (discordId) => {
  const resp = await fetch(`${DISCORD}/guilds/${GUILD}/members/${discordId}`, {
    method: 'GET',
  })
  return {
    status: resp.status,
    statusText: resp.statusText,
    data: await resp.json(),
  }
}

const updateNickName = async (discordId, request, user) => {
  const url = `${DISCORD}/guilds/${GUILD}/members/${discordId}`
  const resp = await fetch(url, {
    ...request,
    body: JSON.stringify({
      nick:
        user.name && user.name !== user.login
          ? `${user.login} (${user.name})`
          : user.login,
    }),
  })
  return {
    status: resp.status,
    statusText: resp.statusText,
    data: await resp.json(),
  }
}

const updateRole = async (discordId, request, roleId) => {
  const url = `${DISCORD}/guilds/${GUILD}/members/${discordId}/roles/${roleId}`
  const resp = await fetch(url, { ...request })
  return { status: resp.status, data: await resp.json() }
}

const joinGuild = async (discordId, request, user, access_token) => {
  const url = `${DISCORD}/guilds/${GUILD}/members/${discordId}`
  const join = await fetch(url, {
    ...request,
    body: JSON.stringify({
      nick:
        user.name && user.name !== user.login
          ? `${user.login} (${user.name})`
          : user.login,
      access_token,
      roles: [rolesByKey.visitor.id],
    }),
  })
  return {
    status: join.status,
    statusText: join.statusText,
    data: await join.json(),
  }
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

  let resp = null

  const { status, data } = await checkMember(discordId)

  if (status === 200 && data) {
    if (
      data.roles.includes(rolesByKey.admin.id) ||
      data.roles.includes(rolesByKey.professor.id)
    ) {
      resp = await updateNickName(
        discordId,
        {
          method: 'PATCH',
          headers: { authorization: `Bot ${BOT_TOKEN}`, ...TYPE_JSON },
        },
        user,
      )
    } else if (user?.role === 'visitor' && !user.speciality) {
      resp = await updateRole(
        discordId,
        {
          method: 'PUT',
          headers: { authorization: `Bot ${BOT_TOKEN}`, ...TYPE_JSON },
        },
        specialities[speciality].id,
      )
    }
  } else {
    resp = await joinGuild(
      discordId,
      {
        method: 'PUT',
        headers: { authorization: `Bot ${BOT_TOKEN}`, ...TYPE_JSON },
      },
      user,
      auth.access_token,
    )
  }

  resp.statusText !== 'ok' ||
    console.error('Unable to join discord:', join.reply)
  user.role =
    roles.find((r) => resp.data.roles.includes(r.id))?.key || 'visitor'
  user.speciality =
    user.role !== 'visitor'
      ? Object.values(specialities)
          .find((r) => resp.data.roles.includes(r.id))
          .name.toLowerCase()
      : user.speciality

  if (user?.role === 'visitor' && !speciality) delete user.speciality

  !speciality
    ? await db.set(session.name, user)
    : await db.update(session.name, { speciality })

  const location = `${
    user.role === 'visitor'
      ? !user.speciality
        ? '/learningchoice'
        : '/student/dashboard'
      : `/${user.role}/dashboard`
  }?${new URLSearchParams(user)}`
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
    body: JSON.stringify({ query: '{ viewer { login id name}}' }),
  })

  const { data, error } = await gql(query)
  if (error) return new Response(error, INTERNAL)

  // create the user session
  const { id, name } = data.viewer
  let { session } = (await db.get(`github-id:${id}`)) || {}
  let user = session && (await db.get(session))

  if (!user?.login) {
    const { login } = data.viewer
    session = `user:${login}:${Date.now().toString(36)}:${rand()}`
    user = { login, name }
    await Promise.all([
      db.set(`github-id:${id}`, { session }),
      db.set(session, user),
    ])
  }

  let redirectUrl = user?.role
    ? user.role === 'visitor' || user.role === 'student'
      ? 'student/dashboard'
      : user.role === 'professor'
      ? 'professor/dashboard'
      : 'admin/dashboard'
    : 'login'

  return new Response(null, {
    status: 301,
    headers: {
      location: `/${redirectUrl}?${new URLSearchParams(user)}`,
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
  if (user?.role === 'visitor' && !speciality)
    return new Response('Missing Speciality', BAD_REQUEST)
  const state = `${rand()}-${rand()}`
  const metadata = { user, name: session, speciality: user?.role && speciality }
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
  // session && (await db.del(session))

  // Clear cookie
  const cookie = `nan-session=; path=/; domain=${hostname}; max-age=-1`
  return new Response(null, {
    status: 301,
    headers: { location: '/login', 'set-cookie': cookie },
  })
}
