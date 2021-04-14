export const match = (route, path) => {
  let params = {}
  let key, val, i, j, v, k
  key = val = ''
  i = j = 0

  while (i < route.length || j < path.length) {
    v = path[i] || '/'
    k = route[j] || '/'
    if (k === '*') return (params[k] = path.slice(j)), params
    if (val) {
      if (v === '/' && k === '/') {
        params[key] = val
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
  return params
}
