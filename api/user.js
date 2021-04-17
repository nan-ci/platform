import { SUCCESS } from './defs.js'
import { POST, withBody } from './router.js'
import * as db from './db.js'

// function to check the form's data

POST.user.registerForm = withBody(
  async ({ session, body }) => {
    const oldData = await db.get(session)
    let updateValue = { ...oldData, profilData: body }
    // update
    console.log('values', oldData, updateValue)
    await db.put(session, updateValue)
    return new Response(JSON.stringify({ message: 'ok all right' }), SUCCESS)
  },
  {
    ownContact: (value) =>
      (/^\+225 ((01 [0456789][1-3])|(05 [0456789][4-6])|(07 [0456789][7-9])) ([0-9]{2}) [0-9]{4}$/.test(
        value,
      ) &&
        value.length === 18) ||
      'please enter a valid phone number please',
    emergencyContact: (value) =>
      (/^\+225 ((01 [0456789][1-3])|(05 [0456789][4-6])|(07 [0456789][7-9])) ([0-9]{2}) [0-9]{4}$/.test(
        value,
      ) &&
        value.length === 18) ||
      'please enter a valid phone number to join in case of emergency',
  },
)
