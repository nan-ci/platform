import { specialities, roles, rolesByKey } from '../data/discord.js'
import { TYPE_JSON } from './defs.js'
import { GET, POST, withBody, withUser } from './router.js'
import * as db from './db.js'

POST.user.profile = withBody(async ({ session, body }) => {
  await db.update(session, body)
  return new Response(
    JSON.stringify({ message: 'ok all is set', data: body }),
    {
      status: 200,
    },
  )
})

GET.user.projects = withUser(async ({ url, session }) => {
  const data = await db.get(session)
  const name = url.searchParams.get('name')
  const datas = name
    ? data.projects && data.projects.find((p) => p.name === name)
    : data.projects
  if (datas) {
    return new Response(JSON.stringify({ data: datas }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ data: null }), { status: 200 })
  }
})

GET.user.quizzes = withUser(async ({ session, url }) => {
  const data = await db.get(session)
  const name = url.searchParams.get('name')
  const datas = name ? data.quizzes && data.quizzes[name] : data.quizzes
  if (datas) {
    return new Response(JSON.stringify({ data: datas }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ data: null }), { status: 200 })
  }
})

POST.user.quizzes = withBody(async ({ url, session, body }) => {
  let { quizzes } = await db.get(session)
  if (!quizzes) quizzes = {}
  if (!url.searchParams.get('name')) {
    quizzes[body.name] = { ...body, name: undefined }
  } else {
    quizzes[url.searchParams.get('name')] = {
      ...quizzes[url.searchParams.get('name')],
      ...body,
    }
  }
  await db.update(session, { quizzes })
  return new Response(
    JSON.stringify({ message: 'ok all is set', data: body, status: true }),
    {
      status: 200,
    },
  )
})

POST.user.projects = withBody(async ({ url, session, body }) => {
  let { projects } = await db.get(session)
  if (!projects) projects = []
  if (!url.searchParams.get('name')) {
    projects.push(body)
  } else {
    projects[
      projects.findIndex((p) => p.project_name === url.searchParams.get('name'))
    ].project_link = body.project_link
  }
  await db.update(session, { projects })
  return new Response(
    JSON.stringify({ message: 'ok all is set', data: body, status: true }),
    {
      status: 200,
    },
  )
})
