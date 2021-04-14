import { readFile, readdir, writeFile, mkdir } from 'fs/promises'
import { parse, join } from 'path'

import * as esbuild from 'esbuild'

import { rootDir, DEV, time } from './utils.js'

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

export { generate, serve, rootDir }

if (import.meta.url.endsWith(process.argv[1])) {
  const outdir = join(rootDir, 'public')
  await mkdir(outdir, { recursive: true })
  await time({
    bundle: esbuild.build(config),
    template: writeFile(join(outdir, 'index.html'), await generate(), 'utf8'),
  })
}
