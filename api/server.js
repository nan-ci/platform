import './auth.js'
import './user.js'
import './professor.js'
import { INTERNAL } from './defs.js'
import { handleRequest } from './router.js'

const toResponse = (e) => new Response(e.message, INTERNAL)
const fetch = (request) => handleRequest(request).catch(toResponse)

addEventListener('fetch', (event) => event.respondWith(fetch(event.request)))
