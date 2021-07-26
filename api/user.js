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

GET.user.quizzes = withUser(async ({ session }) => {
  const data = await db.get(session)
  if (data.quizzes) {
    return new Response(JSON.stringify({ data: data.quizzes }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ data: null }), { status: 200 })
  }
})

GET.user.quiz = withUser(async ({ session, url }) => {
  const data = await db.get(session)
  const quiz = data.quizzes && data.quizzes[url.searchParams.get('name')]
  if (!quiz)
    return new Response(JSON.stringify({ data: null, status: false }), {
      status: 200,
    })
  if (quiz)
    return new Response(JSON.stringify({ data: quiz, status: true }), {
      status: 200,
    })
})

POST.user.quiz = withBody(async ({ url, session, body }) => {
  const data = await db.get(session)
  if (!data.quizzes) data.quizzes = {}
  if (!url.searchParams.get('name')) {
    data.quizzes[body.name] = { ...body, name: null }
  } else {
    data.quizzes[url.searchParams.get('name')] = {
      ...data.quizzes[url.searchParams.get('name')],
      ...body,
    }
  }
  await db.update(session, data)
  return new Response(
    JSON.stringify({ message: 'ok all is set', data: body, status: true }),
    {
      status: 200,
    },
  )
})
