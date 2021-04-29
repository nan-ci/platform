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

export const getExtname = (path) => {
  const split = path.split('/');
  const lastPart = split[split.length-1].split('.');
  return '.'+lastPart[1];
}

export const getContentType = (ext) => {
  switch(ext){
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".png":
      return "image/png";
    case ".jpeg":
      return "image/jpeg";
    case ".jpg":
      return "image/jpg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg";
  }
}
