import './auth.mjs'
import { INTERNAL } from './defs.mjs'
import { handleRequest } from './router.mjs'

const toResponse = (e) => new Response(e.message, INTERNAL)
const fetch = (request) => handleRequest(request).catch(toResponse)

addEventListener('fetch', (event) => event.respondWith(handleRequest(event.request)))
