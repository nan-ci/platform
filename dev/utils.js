import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFile } from 'fs/promises'
export { deepStrictEqual as eq } from 'assert'

export const DEV = process.env.NODE_ENV === 'developement'
export const setImmediate = (fn, delay) => (fn(), setInterval(fn, delay))
export const rootDir = join(fileURLToPath(dirname(import.meta.url)), '../')
export const time = (actions) =>
  Promise.all(
    Object.entries(actions).map(
      ([k, q]) => (console.time(k), q.finally(() => console.timeEnd(k))),
    ),
  )

export const getWranglerConfig = async () => {
  const TOML = (await import('fast-toml')).default
  return TOML.parse(await readFile(join(rootDir, 'wrangler.toml')))
}

export const mapV = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]))

export const times = (n, fn, i = -1) => {
  while (++i < n) fn(i)
}
