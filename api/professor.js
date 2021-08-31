import { TYPE_JSON, SUCCESS, rand, BAD_REQUEST } from './defs.js'
import { GET, POST, withBody, withUser } from './router.js'
import * as db from './db.js'

POST.professor.profile = withBody(async ({ session, body }) => {
  await db.update(session, body)
  return new Response(null, SUCCESS)
})

GET.professor.students = withUser(async ({ url }) => {
  const speciality = url.searchParams.get('speciality')
  if (!speciality) return new Response('No speciality', BAD_REQUEST)
  const all = await (await db.filter('user:')).map((b) => b.metadata)
  const data = all.filter((v) => v.speciality === speciality)
  return new Response(
    data ? 'no students found' : JSON.stringify({ ...data }),
    SUCCESS,
  )
})

POST.professor.students = withBody(async ({ url, body }) => {
  const key = url.searchParams.get('key')
  if (!key) return new Response('no key', BAD_REQUEST)
  await db.update(key, body)
  return new Response(JSON.stringify({ message: 'ok' }), SUCCESS)
})
