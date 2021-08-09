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

o['get all modules'] = {
  it: async () => {
    const session = `professor:rameaux:${Date.now().toString(36)}:${rand()}`
    NAN.put(session, '', {
      metadata: {
        login: 'rameaux',
        name: 'koffi',
        lastname: 'rameaux',
        speciality,
        role: 'professor',
      },
    })
    for (let i = 0; i < 10; i++) {
      let key = `module:${speciality}:${rand()}`
      NAN.put(key, '', {
        metadata: {
          id: key,
          name: 'javascript',
          description: 'this is a brief',
          hours: 200,
          codeColor: '#451fff',
        },
      })
    }
    // const { body, options } = await GET('/professor/modules', {
    //   headers: { cookie: 'nan-session=' + session },
    // })
    // console.log('result', body, options)
    // eq({ status: options.status }, { status: 200 })
  },
}
