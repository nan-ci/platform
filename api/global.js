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
GET.students = withUser(async ({ session, url }) => {
  let { role, speciality } = await db.get(session)
  speciality = speciality ? speciality : url.searchParams.get('speciality')
  const filters = ['projects', 'quizzes', 'challenges']
  const filter = url.searchParams.get('filter')
  if (role === 'student' || role === 'visitor')
    return new Response('you are not authorized', UNAUTHORIZED)
  if (role === 'admin' && !speciality)
    return new Response('missing speciality', UNAUTHORIZED)
  if (filter && !filters.includes(filter))
    return new Response('please give a valid filter', UNAUTHORIZED)

  console.log('testing')
  const allUsers = await db.filter('user:')

  let students =
    allUsers &&
    allUsers.map(
      (u) =>
        (u.metadata.role === 'student' || u.metadata.role === 'visitor') && {
          id: u.name,
          ...u.metadata,
        },
    )

  students =
    role === 'admin' && !speciality
      ? students
      : students.filter((s) => s.speciality === speciality)

  if (filter) {
    students.map((s) => {
      for (let v in s) {
        if (!['id', 'name', 'login', 'username'].includes(v) && v !== filter)
          delete s[v]
      }
      return s
    })
  }

  return new Response(
    JSON.stringify({ data: students ? students : [] }),
    SUCCESS,
  )
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
