import { useState, useEffect } from 'preact/hooks'

// throttle a function call to avoid calling it too much
export const throttle = (fn, delay, t, call = () => ((t = 0), fn())) => () =>
  t || (t = setTimeout(call, delay))

// create an observable or event
export const eve = (...args) => {
  const subs = new Set()
  const sub = (fn) => (subs.add(fn), () => subs.delete(fn))
  const next = () => new Promise(once)
  const once = (fn) =>
    subs.add(function $(prev, next) {
      fn(prev, next)
      subs.delete($)
    })

  // If no arguments are passed, this is an simple event
  if (!args.length) {
    const trigger = (value) => {
      for (const fn of subs) fn(value)
    }
    return { next, once, on: sub, trigger }
  }

  // Otherwhise it's an observable with `set`, `get` and `map`
  // additional methods
  let [data] = args
  const get = () => data
  const on = (fn) => (fn(data), sub(fn))
  const set = (next, force) => {
    if (force || next === data) return
    const prev = data
    data = next
    for (const fn of subs) fn(next, prev)
  }
  const map = (fn) => {
    const { set, ...obs } = eve(fn(get()))
    on((data) => set(fn(data)))
    return obs
  }
  return { map, once, next, get, set, on }
}

export const useEve = ({ get, on }) => {
  const [value, setValue] = useState(get())
  useEffect(() => on(setValue), [])
  return value
}

// create a persisted observable or event
eve.persist = (data) => {
  const ev = eve(data)
  const cached = localStorage[k]
  const save = () => (localStorage[k] = JSON.stringify(ev.get()))
  try {
    cached ? ev.set(JSON.parse(cached)) : save()
  } catch (err) {
    save()
  }
  ev.on(throttle(save, 250))
  return ev
}
