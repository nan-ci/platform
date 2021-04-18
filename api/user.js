import { SUCCESS } from './defs.js'
import { POST, withBody } from './router'
import * as db from './db.js'

const checkInputValue = (val) => {
  const regexForAllNumber = /^\+[0-9]{11,}]$/
  const regexForIvorianNumber = /^\+225 ((01 [045678][1-3])|(05 [045678][4-6])|(07 [045678][1-3])) [0-9]{4}$/
  if (val.startsWith('+225') && !regexForIvorianNumber.test(val))
    return 'please enter a valid ivorian number'
  if (!val.startsWith('+225') && !regexForAllNumber.test(val))
    return 'please enter a valid phone number'
  return true
}

POST.user.updateProfile = withBody(
  async ({ session, body }) => {
    const oldData = await db.get(session)
    await db.put(session, { ...oldData, body })
    return new Response('all right', SUCCESS)
  },
  {
    ownContact: (value) => checkInputValue(value),
    emergencyContact: (value) => checkInputValue(value),
  },
)
