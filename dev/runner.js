import { readdirSync } from 'fs'
import { deepStrictEqual as eq } from 'assert'
import { basename, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const length = import.meta.url.length - basename(import.meta.url).length
const record = {}
export { eq }
export const test = (description, fn, expect) => {
  const fail = new Error(description)
  const [, file, l, c] = fail.stack
    .split('\n')[2]
    .trim()
    .slice(length + 3)
    .split(/(^[^:]+)\:(\d+)\:(\d+)$/)

  const tests = record[file] || (record[file] = [])
  const on = (fn) => ((t.fn = fn), t)
  const t = { description, fn, on, expect, l: Number(l), c: Number(c), file }
  tests.push(t)
  return t
}

let end
const put = (i, str) => {
  process.stdout.cursorTo(0, i)
  process.stdout.clearLine()
  process.stdout.write(str)
  process.stdout.cursorTo(0, end)
}

const clock = [...'🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛']
const runOne = async ({ description, fn, expect, l, c, file }, i) => {
  put(i, `  🕛 ${description}`)
  let iter = 0
  const interval = setInterval(
    () => put(i, `  ${clock[++iter % clock.length]} ${description}`),
    150,
  )
  const result = await Promise.race([
    Promise.resolve()
      .then(fn)
      .then((actual) => eq(actual, expect))
      .catch((err) => (expect instanceof Error ? eq(err, expect) : err)),
    new Promise((_, f) => setTimeout(f, 1000, Error('Timeout'))),
  ]).catch((_) => _)
  clearInterval(interval)
  const fail = result instanceof Error
  put(i, `  ${fail ? '❌' : '✅'} ${description}\n`)
  return { fail, description, l, c, result, i, file }
}

const logs = []
const { log } = console
console.log = console.error = console.info = console.debug = (...args) =>
  logs.push(args)

export const run = async () => {
  const __dirname = fileURLToPath(dirname(import.meta.url))
  const files = readdirSync(__dirname).filter((f) => f.endsWith('_test.js'))
  await Promise.all(files.map((f) => import(join(dirname(import.meta.url), f))))

  const w = Object.entries(record).flatMap(([file, tests]) => [
    (i) => put(i, file),
    ...tests.map((test) => (i) => runOne(test, i)),
  ])

  end = w.length
  console.clear()
  const results = await Promise.all(w.map((x, i) => x(i)))
  const [failed, ...rest] = results.filter((r) => r?.fail)
  failed && put(failed.i, `💀❌ ${failed.description}`)
  process.stdout.cursorTo(0, w.length)
  for (const l of logs) log(...l)
  if (!failed) {
    log('\n🥳 All passed ! ✅✅✅')
    console.log = console.error = console.info = console.debug = log
    return
  }
  log(`\n😵 ${failed.description} (...and ${rest.length} more)`)
  log(`-> ${failed.file}:${failed.l}\n`)
  log(failed.result)
  process.exit(1)
}
