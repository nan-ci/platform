import { GET, requests, DOMAIN, POST, user } from './mocks.js'
import { rand, BAD_REQUEST, UNAUTHORIZED } from '../api/defs.js'
import { roles } from '../data/discord.js'

import * as db from '../api/db.js'
import { eq } from './utils.js'

export const o = {}

const speciality = 'javascript'
const _404 = new Response(null, { status: 404, statusText: 'Not Found' })
const { hostname } = new URL(DOMAIN)
const body = { username: 'ramseycoder' }

// o['get all quizzes'] = {
//   it: async () => {
//     const session = `user:tester:${Date.now().toString(36)}:${rand()}`
//     NAN.put(session, '', { metadata: { quizzes: {} } })
//     const { body, options } = await GET('/user/quizzes', {
//       headers: { cookie: 'nan-session=' + session },
//     })
//     eq({ status: options.status }, { status: 200 })
//   },
// }
