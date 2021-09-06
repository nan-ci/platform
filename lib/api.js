import { API, DEV } from './env.js'

const addDevCookie = DEV
  ? (otps) => ({
      ...opts,
      headers: { ...opts?.headers, 'x-nan-cookie': document.cookie },
    })
  : (opts) => opts

const get = (_, method) => {
  const fetcher = async (path, { params, ...opts } = {}) => {
    const strParams = params ? `?${new URLSearchParams(params)}` : ''
    const res = await fetch(`${API}/${path}${strParams}`, {
      credentials: 'include',
      ...addDevCookie(opts),
      method,
    })
    if (res.ok) return res.status === 204 ? null : res.json()
    const err = Error(res.statusText)
    err.statusCode = res.status
    err.body = await res.text()
    throw err
  }

  return fetcher
}

export const { GET, POST, DELETE } = new Proxy({}, { get })
