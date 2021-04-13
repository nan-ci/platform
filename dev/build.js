import { fileURLToPath } from 'url'
import { dirname, parse, join } from 'path'
import { readFile, readdir, writeFile, mkdir } from 'fs/promises'

import * as esbuild from 'esbuild'

process.env.NODE_ENV = process.env.NODE_ENV || 'developement'
const DEV = process.env.NODE_ENV === 'developement'
const rootDir = join(fileURLToPath(dirname(import.meta.url)), '../')
const templateDir = join(rootDir, 'template')
const readEntry = async ({ name, ext, base }) => [
  name,
  ext === '.js'
    ? (await import(join(templateDir, base))).default()
    : await readFile(join(templateDir, base), 'utf8'),
]

const servedir = join(rootDir, 'public')
const config = {
  entryPoints: [join(rootDir, 'app.jsx')],
  bundle: true,
  outdir: join(rootDir, 'public/js'),
  jsxFragment: 'Fragment',
  jsxFactory: 'h',
  format: 'esm',
  define: { 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` },
  inject: [DEV ? 'lib/preact-shim-dev.js' : 'lib/preact-shim.js'],
  ...(DEV ? { sourcemap: 'inline' } : { splitting: true, minify: true }),
}

const serve = () => esbuild.serve({ servedir }, config)
const build = async () => {
  await mkdir(join(rootDir, 'public'), { recursive: true })
  const output = esbuild.build(config)
  await writeFile(join(rootDir, 'public/index.html'), await generate(), 'utf8')
  return output
}

const generate = async (file = 'index') => {
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

  return readTemplate(file)
}

export { generate, serve, rootDir, build }
