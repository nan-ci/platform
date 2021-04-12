import { deepStrictEqual as eq } from 'assert'
import { basename } from 'path'

const pathLength = import.meta.url.length - basename(import.meta.url).length

const record = {}
export { eq }
export const test = (description, fn, expect) => {
  const fail = new Error(description)
  const [, file, l, c] = fail.stack
    .split('\n')[2]
    .trim()
    .slice(pathLength + 3)
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
    Promise.resolve(fn({ eq }))
      .catch((_) => _)
      .then((r) => {
        expect == null || eq(r, expect)
        return r
      }),
    new Promise((_, f) => setTimeout(f, 1000, Error('Timeout'))),
  ]).catch((_) => _)
  clearInterval(interval)
  const fail = expect == null && result instanceof Error
  put(i, `  ${fail ? '❌' : '✅'} ${description}\n`)
  return { fail, description, l, c, result, i, file }
}

const logs = []
const { log } = console
console.log = console.error = console.info = console.debug = (...args) =>
  logs.push(args)

export const run = async () => {
  const w = Object.entries(record).flatMap(([file, tests]) => [
    (i) => put(i, file),
    ...tests.map((test) => (i) => runOne(test, i)),
  ])

  end = w.length
  const results = await Promise.all(w.map((x, i) => x(i)))
  const [failed, ...rest] = results.filter((r) => r?.fail)
  failed && put(failed.i, `💀❌ ${failed.description}`)
  process.stdout.cursorTo(0, w.length)
  for (const l of logs) log(...l)
  if (!failed) {
    log('\n🥳 All passed ! ✅✅✅')
    return 0
  }
  log(`\n😵 ${failed.description} (...and ${rest.length} more)`)
  log(`-> ${failed.file}:${failed.l}\n`)
  log(failed.result)
  return 1
}
