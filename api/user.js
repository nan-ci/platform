import { specialities, roles, rolesByKey } from '../data/discord.js'
import { GET, POST, withBody } from './router.js'
import * as db from './db.js'
import { BAD_REQUEST } from './defs.js'

POST.user.profile = withBody(async ({ session, body }) => {
  await db.update(session, body);
  return new Response('ok all is set', {
    status: 200,
  })
})
