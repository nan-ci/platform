import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFile } from 'fs/promises'

export const DEV = process.env.NODE_ENV === 'developement'
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
