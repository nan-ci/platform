import { dirname, parse, join } from 'path'
import { fileURLToPath } from 'url'
import { readFile, readdir, writeFile } from 'fs/promises'

const rootDir = join(fileURLToPath(dirname(import.meta.url)), '../')
const templateDir = join(rootDir, 'template')
const readEntry = async ({ name, ext, base }) => [
  name,
  ext === '.mjs'
    ? (await import(join(templateDir, base))).default()
    : await readFile(join(templateDir, base), 'utf8'),
]
const content = await readdir(templateDir)
const entries = await Promise.all(content.map(parse).map(readEntry))
const templates = Object.fromEntries(entries)
const cache = {}
const replace = (_, k) => readTemplate(k)
const readTemplate = (key) =>
  cache[key] ||
  (cache[key] =
    templates[key]?.replace(/<!-- ([a-zA-Z0-9]+) -->/gm, replace) ||
    `<!-- missing template ${key} -->`)

await writeFile(
  join(rootDir, 'public/index.html'),
  readTemplate('index'),
  'utf8',
)
