import { specialities, roles, rolesByKey } from '../data/discord.js'
import { NOT_FOUND, SUCCESS, TYPE_JSON } from './defs.js'
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
  const key = url.searchParams.get('key')
  const datas = key
    ? data.projects && data.projects.find((p) => p.project_id === key)
    : data.projects
  if (datas) {
    return new Response(JSON.stringify({ data: datas }), SUCCESS)
  } else {
    return new Response(JSON.stringify({ data: [] }), SUCCESS)
  }
})

GET.user.quizzes = withUser(async ({ session, url }) => {
  const data = await db.get(session)
  const key = url.searchParams.get('key')
  let datas = null
  if (!key) datas = data.quizzes
  else {
    datas = data.quizzes && data.quizzes[key]
  }

  if (datas) {
    return new Response(JSON.stringify({ data: datas }), SUCCESS)
  } else {
    return new Response(JSON.stringify({ data: [] }), SUCCESS)
  }
})

POST.user.quizzes = withBody(async ({ url, session, body }) => {
  let { quizzes } = await db.get(session)
  if (!quizzes) quizzes = {}
  if (!url.searchParams.get('key')) {
    quizzes[body.quizId] = { ...body, quizId: undefined }
  } else {
    quizzes[url.searchParams.get('key')] = {
      ...quizzes[url.searchParams.get('key')],
      ...body,
    }
  }
  await db.update(session, { quizzes })
  return new Response(
    JSON.stringify({ message: 'ok all is set', data: body, status: true }),
    SUCCESS,
  )
})

POST.user.projects = withBody(async ({ url, session, body }) => {
  let { projects } = await db.get(session)
  if (!projects) projects = []
  if (!url.searchParams.get('key')) {
    projects.push(body)
  } else {
    projects[
      projects.findIndex((p) => p.project_id === url.searchParams.get('key'))
    ].project_link = body.project_link
  }
  await db.update(session, { projects })
  return new Response(
    JSON.stringify({ message: 'ok all is set', data: body, status: true }),
    SUCCESS,
  )
})
