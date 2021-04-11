import { run } from './runner.mjs'
import { readdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(dirname(import.meta.url))
const files = readdirSync(__dirname).filter((f) => f.endsWith('_test.mjs'))
const tests = await Promise.all(
  files.map((f) => import(join(dirname(import.meta.url), f))),
)

await run()
