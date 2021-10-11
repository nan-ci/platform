import { readFileSync } from 'fs'
import { fromMarkdown } from 'mdast-util-from-markdown'

const obj = {}
const file = readFileSync('test.md')
const tree = fromMarkdown(file)

const description = () => {
  let p = tree.children.filter((v) => v.type === 'paragraph')
  return p
    .flatMap((n) => n.children)
    .map((e) => e.value)
    .join(' ')
}

const notions = () => {
  let ul = tree.children.filter((v) => v.type === 'list')
  return ul[0].children
    .flatMap((e) => e.children)
    .flatMap((v) => v.children)
    .map((k) => k.value)
}

const name = () => {
  const h1 = tree.children.filter((v) => v.depth === 1)
  return h1
    .flatMap((m) => m.children)
    .map((u) => u.value)
    .join('')
}

const tests = () => {
  const arr = []
  const h3 = tree.children.filter((v) => v.depth === 3)
  const val = h3.flatMap((m) => m.children).map((u) => u.value)
  for (const text of val) {
    arr.push({ name: text, code: '' })
  }
  return arr
}

obj.name = name()
obj.notions = notions()
obj.description = description()
obj.tests = tests()

console.log(obj)
