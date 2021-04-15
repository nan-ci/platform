export const eve = (data) => {
  const subs = new Set()
  const on = (fn) => (subs.add(fn), () => subs.delete(fn))
  const next = () => new Promise(once)
  const once = (fn) =>
    subs.add(function $(prev, next) {
      fn(prev, next)
      subs.delete($)
    })

  // If data is undefined, this is an simple event
  if (data === undefined) {
    const trigger = (value) => {
      for (const fn of subs) fn(value)
    }
    return { next, once, on, trigger }
  }

  // Otherwhise it's an observable with `set` and `get`
  // additional methods
  return {
    once,
    next,
    get: () => data,
    on: (fn) => (fn(data), on(fn)),
    set: (next, force) => {
      if (force || next === data) return
      const prev = data
      data = next
      for (const fn of subs) fn(next, prev)
    },
  }
}
