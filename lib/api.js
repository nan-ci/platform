import { API } from './env.js'
const get = (_, method) => async (path, opts) => {
  const res = await fetch(`${API}/${path}`, {
    ...opts,
    method,
    credentials: 'include',
  })
  if (res.ok) return res.json()
  const err = Error(res.statusText)
  err.statusCode = res.status
  err.body = await res.text()
  throw err
}
export const { GET, POST, DELETE } = new Proxy({}, { get })
