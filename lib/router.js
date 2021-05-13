import { toChildArray, cloneElement } from 'preact'

import { useEve } from './hooks.js'
import { frame } from './state.js'
import {link} from './dom.js';

const { history, location } = window

export const match = (route, path) => {
  let props = {}
  let key, val, i, j, v, k
  key = val = ''
  i = j = 0
  while (i < route.length || j < path.length) {
    v = path[i] || '/'
    k = route[j] || '/'
    if (k === '*') return (props[k] = path.slice(j)), props
    if (val) {
      if (v === '/' && k === '/') {
        props[key] = val
        val = ''
        j++, i++
      } else {
        k !== '/' && ((key += k), j++)
        v !== '/' && ((val += v), i++)
      }
    } else {
      j++, i++
      if (k === ':') (key = ''), (val = v)
      else if (k !== v) return
    }
  }
  return props
}

const shouldSkip = (event) =>
  event.defaultPrevented ||
  event.button ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey

export const RouterLink = (props) => {
  props.onClick = (event) => {
    if (shouldSkip(event)) return
    event.preventDefault()
    navigate(props.href)
  }
  return h('a', props)
}

const scores = {} // cache routes scores to avoid computations
const byRank = (a, b) => rank(b.props.path || '') - rank(a.props.path || '')
const rankPart = (acc, p) => acc + (p[0] === ':' ? 2 : (p !== '*') * 2 + 1)
export const rank = (route) =>
  scores[route] ||
  (scores[route] = route.split('/').filter(Boolean).reduce(rankPart, 0))

export const navigate = (to, { replace = false } = {}) =>
  history[replace ? 'replaceState' : 'pushState']({}, null, to)

export const href = frame.map(() => location.href)


const urlEvent  = href.map(value => new URL(value));

urlEvent.on(({pathname}) => {
   if(pathname === "/auth"){
    link('https://fonts.gstatic.com', 'preconnect')
    link(
      'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
      'stylesheet',
    )
    link(
      'https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@300;400;500;600;700&display=swap',
      'stylesheet',
    )
    document.body.setAttribute('class', 'simple-theme')
    document.body.firstChild.setAttribute('class','login-page')
   }

})

export const useURL = () => new URL(useEve(href))
export const Router = (props) => {
  const url = useURL()
  const children = toChildArray(props.children).sort(byRank)
  for (const child of children) {
    const props = match(child.props.path, url.pathname)
    if (!props) continue
    props.pathname = url.pathname
    props.params = Object.fromEntries(url.searchParams)
    props.hash = url.hash.slice(1)
    return cloneElement(child, Object.assign(props, child.props))
  }
  return null
}
