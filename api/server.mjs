import './auth.mjs'
import { Room } from './room.mjs'
import { INTERNAL } from './defs.mjs'
import { handleRequest } from './router.mjs'

const toResponse = (e) => new Response(e.message, INTERNAL)
const fetch = (request, env) => handleRequest(request, env).catch(toResponse)

export { Room }
export default { fetch }
