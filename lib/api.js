import { API, DEV } from './env.js'
import { useState, useEffect } from 'preact/hooks'

const addDevCookie = DEV
  ? (opts) => ({
      ...opts,
      headers: { ...opts?.headers, 'x-nan-cookie': JSON.parse(localStorage.user)['nan-session'] },
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

  fetcher.use = (path, opts) => {
    const [request, setRequest] = useState({ status: 'PENDING' })
    useEffect(() => {
      const controller = new AbortController()
      fetcher(path, { ...opts, signal: controller.signal }).then(
        (data) => setRequest({ status: 'FULFILLED', data }),
        (error) =>
          error.name === 'AbortError' ||
          setRequest({ status: 'REJECTED', error }),
      )
      return () => {
        setRequest({ status: 'PENDING' })
        controller.abort()
      }
    }, [path, opts])
    return request
  }

  fetcher.useAction = () => {
    const [request, setRequest] = useState({ status: 'IDLE' })
    const action = (path, opts) => {
      const controller = new AbortController()
      const abort = () => {
        controller.abort()
        setRequest({ status: 'IDLE' })
      }
      setRequest({ status: 'PENDING', abort })
      return fetcher(path, { ...opts, signal: controller.signal }).then(
        (data) => setRequest({ status: 'FULFILLED', data }),
        (error) =>
          error.name === 'AbortError' ||
          setRequest({ status: 'REJECTED', error }),
      )
    }
    return [request, action]
  }

  return fetcher
}

export const { GET, POST, DELETE } = new Proxy({}, { get })
