import { deepStrictEqual as eq } from 'assert'
import { basename } from 'path'

const pathLength = import.meta.url.length - basename(import.meta.url).length

const record = {}
export const test = (description, fn, expect) => {
  const fail = new Error(description)
  const [, file, l, c] = fail.stack
    .split('\n')[2]
    .trim()
    .slice(pathLength + 3)
    .split(/(^[^:]+)\:(\d+)\:(\d+)$/)

  const tests = record[file] || (record[file] = [])
  const on = (fn) => ((t.fn = fn), t)
  const t = { description, fn, on, expect, l: Number(l), c: Number(c) }
  tests.push(t)
  return t
}

export const run = async () => {
  for (const [file, tests] of Object.entries(record)) {
    console.log('testing', file)
    for (const { description, fn, expect, l, c } of tests) {
      try {
        const result = await fn({ eq })
        expect == null || eq(result, expect)
        console.log(`✅ ${description}`)
      } catch (err) {
        console.log(`❌ ${description}`)
        console.error(err)
      }
    }
  }
}
