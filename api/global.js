import { SUCCESS, rand, BAD_REQUEST, UNAUTHORIZED } from './defs.js'
import { GET, POST, withBody, withUser } from './router.js'
import * as db from './db.js'

const getFunc = (type) =>
  withUser(async ({ session, url }) => {
    let {
      speciality = url.searchParams.get('speciality'),
      role,
    } = await db.get(session)
    const key = url.searchParams.get('key')
    const del = url.searchParams.get('del')
    if (!speciality) return new Response('missing speciality', BAD_REQUEST)
    if (del && role === 'student')
      return new Response('you are not  authorized', UNAUTHORIZED)
    if (key && del) {
      await db.del(key)
      return new Response(JSON.stringify({ success: true }), SUCCESS)
    }
    const data = key
      ? await db.get(key)
      : await db.filter(`${type}:${speciality}`)
    return new Response(
      data
        ? JSON.stringify({ data: key ? data : data.map((d) => d.metadata) })
        : 'no module found',
      SUCCESS,
    )
  })

const postFunc = (type) =>
  withBody(async ({ url, session, body }) => {
    const {
      speciality = url.searchParams.get('speciality'),
      role,
    } = await db.get(session)

    if (!speciality) return Response('missing speciality', UNAUTHORIZED)
    if (role === 'student') {
      return Response('you are not authorized', UNAUTHORIZED)
    }

    const key = url.searchParams.get('key') || `${type}:${speciality}:${rand()}`
    await (url.searchParams.has('key')
      ? db.update(key, body)
      : db.set(key, { id: key, ...body }))

    return new Response(JSON.stringify({ success: true, key }), SUCCESS)
  })

// modules
GET.modules = getFunc('module')
POST.modules = postFunc('module')

// courses
GET.courses = getFunc('course')
POST.courses = postFunc('course')

// projects
GET.projects = getFunc('project')
POST.projects = postFunc('project')

// quizzes
GET.quizzes = getFunc('quiz')
POST.quizzes = postFunc('quiz')

// student
const unfilterableKeys = new Set(['id', 'name', 'login', 'username'])
const validFilters = new Set(['projects', 'quizzes', 'challenges'])
GET.students = withUser(async ({ session, url }) => {
  const {
    role,
    speciality = url.searchParams.get('speciality'),
  } = await db.get(session)

  if (role === 'student' || role === 'visitor')
    return new Response('you are not authorized', UNAUTHORIZED)

  if (role === 'admin' && !speciality)
    return new Response('missing speciality', BAD_REQUEST)

  const filter = url.searchParams.get('filter')
  if (filter && !validFilters.has(filter))
    return new Response('please give a valid filter', BAD_REQUEST)

  console.log('testing')
  const allUsers = await db.filter('user:')

  let data = (allUsers || [])
    .filter(
      ({ metadata: { role } }) => role === 'student' || role === 'visitor',
    )
    .map((u) => ({ id: u.name, ...u.metadata }))

  if (role !== 'admin' && speciality) {
    data = data.filter((s) => s.speciality === speciality)
  }

  if (filter) {
    data = data.map((s) =>
      Object.fromEntries(
        Object.entries(s).filter(
          ([k, v]) => unfilterableKeys.has(k) || k !== filter,
        ),
      ),
    )
  }

  return new Response(JSON.stringify({ data }), SUCCESS)
})

POST.students = withBody(async ({ session, url, body }) => {
  const { role } = await db.get(session)
  const key = url.searchParams.get('key')
  if (!key || role === 'student' || role === 'visitor')
    return Response(
      !key ? 'missing key' : 'you are not authorized',
      UNAUTHORIZED,
    )
  const update = await db.update(key, { ...body })
  return new Response('ok', SUCCESS)
})
