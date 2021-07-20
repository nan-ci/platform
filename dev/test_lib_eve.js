import { eq, mapV, times } from './utils.js'
import { eve, throttle } from '../lib/eve.js'

export const o = {}

// structural tests
const sharedMethods = { on: 'function', once: 'function', next: 'function' }
o['calling eve without a value create an event'] = {
  it: () => mapV(eve(), (v) => typeof v),
  is: { trigger: 'function', ...sharedMethods },
}

o['calling eve without a value create an event'] = {
  it: () => mapV(eve(5), (v) => typeof v),
  is: {
    set: 'function',
    get: 'function',
    map: 'function',
    ...sharedMethods,
  },
}

// METHODS
// Events
o['.on and .trigger method of events 5 times'] = {
  it: () => {
    const { on, trigger } = eve()
    let count = 0
    on(() => count++)
    times(5, trigger)
    return count
  },
  is: 5,
}

o['.trigger arguments are passed to .on'] = {
  it: () => {
    const { on, trigger } = eve()
    let count = 0
    on((n) => (count += n))
    times(5, trigger)
    return count
  },
  is: 0 + 1 + 2 + 3 + 4,
}

o['.once is like .on, but only once'] = {
  it: () => {
    const { once, trigger } = eve()
    setTimeout(times, 0, 3, trigger)
    return new Promise(once)
  },
  is: 0,
}

o['.next is like .once, but returns a promise'] = {
  it: () => {
    const { next, trigger } = eve()
    setTimeout(times, 0, 3, trigger)
    return next()
  },
  is: 0,
}

o['.on return a function to stop listening to the event'] = {
  it: () => {
    const { on, trigger } = eve()
    let count = 0
    const stop = on((n) => (count += n))
    times(5, trigger)
    stop()
    times(5, trigger)
    return count
  },
  is: 0 + 1 + 2 + 3 + 4,
}

// Observables
o['.on is called immediatly with the current value'] = {
  it: () => new Promise(eve('fast').on),
  is: 'fast',
}

o['.on is called with prev and next values'] = {
  it: () => {
    const { on, set } = eve(5)
    let prev, next
    on((n, p) => ((prev = p), (next = n)))
    set('hello')
    set('there')
    return { prev, next }
  },
  is: { prev: 'hello', next: 'there' },
}

o['.once is called with prev and next values'] = {
  it: () => {
    const { once, set } = eve('hello')
    let last
    once((next, prev) => (last = { next, prev }))
    times(3, set)
    return last
  },
  is: { prev: 'hello', next: 0 },
}

o['.next is called with only next value'] = {
  it: () => {
    const { next, set } = eve('yo')
    setTimeout(times, 0, 3, set)
    return next()
  },
  is: 0,
}

o['only triggers if the value changed'] = {
  it: () => {
    const { on, set } = eve('hello')
    let count = 0
    on(() => count++)
    set('hello')
    set('wesh')
    set('wesh')
    return count
  },
  is: 2,
}

o['.map create a new event as a function of the original'] = {
  it: () => {
    const num = eve(0)
    const odd = num.map((n) => n % 2 === 1)
    eq(odd.get(), false)
    num.set(num.get() + 1)
    eq(odd.get(), true)
    num.set(num.get() + 1)
    eq(odd.get(), false)
  },
}

o['mapped event only trigger if its value changed (not the source event)'] = {
  it: () => {
    const num = eve(0)
    const odd = num.map((n) => n % 2 === 1)
    let oddCount = 0
    let numCount = 0
    odd.on(() => oddCount++)
    num.on(() => numCount++)
    num.set(2)
    num.set(4)
    num.set(6)
    num.set(7)
    return { oddCount, numCount }
  },
  is: { oddCount: 2, numCount: 5 },
}
