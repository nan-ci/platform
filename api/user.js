import { SUCCESS, TYPE_JSON } from './defs.js'
import { POST, withBody } from './router.js'
import * as db from './db.js'

// function to check the form's data

POST.user.registerForm = withBody(
  async ({ session, body }) => {
    const oldData = await db.get(session)
    // update
    await db.put(session, { ...oldData, body })
    console.log('up to date')
    return new Response('all right', SUCCESS)
  },
  {
    ownContact: (value) =>
      /\+[0-9]+/.test(value) || 'please enter a valid phone number please',
    emergencyContact: (value) =>
      /\+[0-9]+/.test(value) ||
      'please enter a valid phone number to join in case of emergency',
  },
)
