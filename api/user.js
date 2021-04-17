import { SUCCESS, TYPE_JSON } from './defs.js'
import { POST, withBody } from './router.js'
import * as db from './db.js'

// function to check the form's data

POST.user.registerForm = withBody(
  async ({ session, body }) => {
    const oldData = await db.get(session)
    let updateValue = { ...oldData, profilData: body }
    console.log('oldData', session, oldData, body, updateValue)

    // update
    await db.put(session, updateValue)
    const get = await db.get(session)
    console.log('up to date', get)
    return new Response(JSON.stringify({ message: 'ok all right' }), SUCCESS)
  },
  {
    ownContact: (value) =>
      (/^\+225((01[0456789][1-3])|(05[0456789][4-6])|(07[0456789][7-9]))([0-9]{2}){3}$/.test(
        value,
      ) &&
        value.length === 14) ||
      'please enter a valid phone number please',
    emergencyContact: (value) =>
      (/^\+225((01[0456789][1-3])|(05[0456789][4-6])|(07[0456789][7-9]))([0-9]{2}){3}$/.test(
        value,
      ) &&
        value.length === 14) ||
      'please enter a valid phone number to join in case of emergency',
  },
)
