import { TYPE_JSON, SUCCESS, rand } from './defs.js'
import { GET, POST, withBody, withUser } from './router.js'
import * as db from './db.js'

POST.professor.profile = withBody(async ({ session, body }) => {
  await db.update(session, body)
  return new Response(null, SUCCESS)
})

GET.professor.modules = withUser(async ({ session, url }) => {
  const { speciality } = await db.get(session)
  const key = url.searchParams.get('key')
  const data = key
    ? await db.get(key)
    : await db.filter(`module:${speciality}:`)
  return new Response(
    data ? 'no module found' : JSON.stringify({ ...data }),
    SUCCESS,
  )
})

POST.professor.modules = withBody(async ({ url, session, body }) => {
  const mkey = url.searchParams.get('key')
  const del = url.searchParams.get('del')
  const { speciality } = await db.get(session)
  const key = !mkey && `module:${speciality}:${rand()}`
  if (mkey && !del) await db.update(key, body)
  else if (mkey && del) await db.del(key)
  else await db.set(key, { id: key, ...body })
  return new Response(JSON.stringify('qfdqf'), SUCCESS)
})

GET.professor.courses = withUser(async ({ session, url }) => {
  const { speciality } = await db.get(session)
  const key = url.searchParams.get('key')
  const data = key
    ? await db.get(key)
    : await db.filter(`course:${speciality}:`)
  return new Response(
    data ? 'no course found' : JSON.stringify({ ...data }),
    SUCCESS,
  )
})

POST.professor.courses = withBody(async ({ url, session, body }) => {
  const ckey = url.searchParams.get('key')
  const del = url.searchParams.get('del')
  const { speciality } = await db.get(session)
  const key = !ckey && `course:${speciality}:${body.idModule}:${rand()}`
  if (ckey && !del) await db.update(key, body)
  else if (ckey && del) await db.del(key)
  else await db.set(key, { id: key, ...body })
  return new Response(JSON.stringify(), SUCCESS)
})

GET.professor.projects = withUser(async ({ session, url }) => {
  const { speciality } = await db.get(session)
  const key = url.searchParams.get('key')
  const data = key
    ? await db.get(key)
    : await db.filter(`project:${speciality}:`)
  return new Response(
    data ? 'no project found' : JSON.stringify({ ...data }),
    SUCCESS,
  )
})

POST.professor.projects = withBody(async ({ url, session, body }) => {
  const pkey = url.searchParams.get('key')
  const del = url.searchParams.get('del')
  const { speciality } = await db.get(session)
  const key = !pkey && `project:${speciality}:${body.idModule}:${rand()}`
  if (pkey && !del) await db.update(key, body)
  else if (pkey && del) await db.del(key)
  else await db.set(key, { id: key, ...body })
  return new Response(JSON.stringify(), SUCCESS)
})

GET.professor.quizzes = withUser(async ({ session, url }) => {
  const { speciality } = await db.get(session)
  const key = url.searchParams.get('key')
  const data = key ? await db.get(key) : await db.filter(`quiz:${speciality}:`)
  return new Response(
    data ? 'no quiz found' : JSON.stringify({ ...data }),
    SUCCESS,
  )
})

POST.professor.quizzes = withBody(async ({ url, session, body }) => {
  const qkey = url.searchParams.get('key')
  const del = url.searchParams.get('del')
  const { speciality } = await db.get(session)
  const key = !qkey && `quiz:${speciality}:${rand()}`
  if (qkey && !del) await db.update(key, body)
  else if (qkey && del) await db.del(key)
  else await db.set(key, { id: key, ...body })
  return new Response(JSON.stringify(), SUCCESS)
})

GET.professor.students = withUser(async ({ session, url }) => {
  const key = url.searchParams.get('key')
  const data = key ? await db.get(key) : await db.filter(`user:${login}:`)
  return new Response(
    data ? 'no students found' : JSON.stringify({ ...data }),
    SUCCESS,
  )
})
