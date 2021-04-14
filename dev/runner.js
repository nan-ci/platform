import { readdirSync } from 'fs'
import { basename, dirname, join } from 'path'
import { performance } from 'perf_hooks'

import { rootDir, setImmediate, eq } from './utils.js'

const logs = []
const { log } = console
console.log = console.error = (...args) => logs.push(args)
const restoreLogs = () => {
  for (const l of logs) log(...l)
  console.log = console.error = log
}

const compare = (it, is) => {
  let id
  const kill = new Promise(
    (_, f) => (id = setTimeout(f, 1000, Error('Timeout'))),
  )
  const run = Promise.resolve()
    .then(it)
    .then((actual) => eq(actual, is))
    .catch((err) => (is instanceof Error ? eq(err, is) : err))
  return Promise.race([kill, run])
    .catch((_) => _)
    .finally(() => clearTimeout(id))
}

const clock = [...'🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛']
const parallel = async ({ description, it, is }, put) => {
  let x = 0
  const start = performance.now()
  const tick = (icon = clock[++x % clock.length]) =>
    put(`  ${icon} ${description} ${(performance.now() - start).toFixed(1)}ms`)
  const interval = setImmediate(tick, 150)
  const result = await compare(it, is)
  clearInterval(interval)
  const fail = result instanceof Error
  tick(fail ? '❌' : '✅')
  return { fail, description, result, put }
}

const getFiles = () => {
  const testDir = join(rootDir, 'dev')
  const files = readdirSync(testDir).filter((f) => f.endsWith('_test.js'))
  const importTests = async (f) => [
    basename(f),
    Object.entries(
      (await import(join(testDir, f))).o,
    ).map(([description, t]) => ({ description, ...t })),
  ]
  return Promise.all(files.map(importTests))
}

const run = async () => {
  const files = await getFiles()
  for (const [n, [file, tests]] of files.entries()) {
    const put = (i, str) => {
      process.stdout.cursorTo(0, i)
      process.stdout.clearLine()
      process.stdout.write(str)
      process.stdout.cursorTo(0, tests.length)
    }
    const start = performance.now()
    put(0, `${n + 1}/${files.length} - ${file}`)
    const runs = tests.map((t, i) => parallel(t, (str) => put(i, str)))
    console.clear()
    const results = await Promise.all(runs)
    const elapsed = (performance.now() - start).toFixed(1)
    put(0, `${n + 1}/${files.length} - ${file} TOTAL: ${elapsed}ms`)
    const [failed, ...rest] = results.filter((r) => r?.fail)
    if (failed) {
      failed.put(`💀❌ ${failed.description}`)
      log(`\n😵 ${failed.description} (...and ${rest.length} more)`)
      process.exit(1)
    }
  }
  log('\n🥳 All passed ! ✅✅✅')
  restoreLogs()
}

if (import.meta.url.endsWith(process.argv[1])) {
  restoreLogs()
  const files = await getFiles()
  for (const [n, [file, tests]] of files.entries()) {
    console.time(`${n + 1}/${files.length} - ${file}`)
    for (const { description, it, is } of tests) {
      console.time(description)
      const result = await compare(it, is)
      if (result instanceof Error) {
        console.timeEnd(description)
        console.error(result)
        process.exit(1)
      }
    }
    console.timeEnd(`${n + 1}/${files.length} - ${file}`)
  }
}
