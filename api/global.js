import {
  TYPE_JSON,
  SUCCESS,
  rand,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
} from './defs.js'
import { GET, POST, withBody, withUser } from './router.js'
import * as db from './db.js'

const getFunc = (type) =>
  withUser(async ({ session, url }) => {
    let { speciality, role } = await db.get(session)
    speciality = speciality || url.searchParams.get('speciality')
    const key = url.searchParams.get('key')
    const del = url.searchParams.get('del')
    if (!speciality) return new Response('missing speciality', BAD_REQUEST)
    if (del && role === 'student')
      return new Response('you are not  authorized', UNAUTHORIZED)
    if (key && del) {
      await db.del(key)
      return new Response(null, SUCCESS)
    }
    const data = key
      ? await db.get(key)
      : await db.filter(`${type}:${speciality}`)
    return new Response(
      data
        ? JSON.stringify({ data: key ? data : data.map((d) => d.metadata) })
        : 'no module found',
      data ? SUCCESS : NOT_FOUND,
    )
  })

const postFunc = (type) =>
  withBody(async ({ url, session, body }) => {
    let { speciality, role } = await db.get(session)
    const key = !url.searchParams.get('key')
      ? `${type}:${speciality}:${rand()}`
      : url.searchParams.get('key')
    speciality = speciality || url.searchParams('speciality')
    if (role === 'student')
      return Response('you are not authorized', UNAUTHORIZED)
    if (!speciality) return Response('missing speciality', BAD_REQUEST)
    if (url.searchParams.get('key')) await db.update(key, body)
    else await db.set(key, { id: key, ...body })
    return new Response(null, SUCCESS)
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
