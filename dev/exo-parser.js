import { readFile, readdir, writeFile, mkdir, rename } from 'fs/promises'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

// returns a flatten array of all the children
const children = (n) =>
  n.children ? [n, ...n.children.flatMap(children)] : [n]

const getTrimValue = (n) => n.value?.trim()
const textContent = (n) =>
  children(n).map(getTrimValue).filter(Boolean).join(' ') || ''

const isH1 = (node) => node.type === 'heading' && node.depth === 1
const isH2 = (node) => node.type === 'heading' && node.depth === 2
const isH3 = (node) => node.type === 'heading' && node.depth === 3
const text = (node) => node.type === 'paragraph'
const isList = (node) => node.type === 'list'

const parseContent = (nodeList) => {
  const content = { description: '' }
  let mode,
    test = text
  for (const node of nodeList) {
    if (!content.title && isH1(node)) {
      content.title = textContent(node)
    } else if (isH2(node)) {
      mode = textContent(node).toLowerCase()
      content[mode] = []
    } else if (mode === 'notions') {
      if (isList(node)) {
        let ul = node.children
          .flatMap((e) => e.children)
          .flatMap((v) => v.children)
          .map((k) => k.value)
        content.notions = ul
      }
    } else if (mode === 'instructions') {
      if (text(node)) {
        let p = node.children.map((e) => e.value)
        content.instructions = p.join('')
      }
    } else if (mode === 'tests') {
      if (isH3(node)) {
        test = { name: textContent(node) }
        content.tests.push(test)
      } else if (test && node.type === 'code') {
        test.code = textContent(node)
        test.lang = node.lang
      } else {
        console.warn('ignored node', node)
      }
    } else if (mode) {
      // any other mode is stored in raw tree
      content[mode].push(node)
    } else {
      // before any mode is set, we are writing the description
      content.description += textContent(node)
    }
  }
  return content
}

const dirList = await readdir('js-introduction')
const entries = await Promise.all(
  dirList.map(async (name) => {
    const file = await readFile(join('js-introduction/', name))
    const root = fromMarkdown(file)
    return [name, parseContent(root.children)]
  }),
)

export const generateExoFile = async () => {
  dirList.map(async (filename) => {
    const data = Object.fromEntries(entries)[`${filename}`]

    await Promise.all([
      // Create each exercise json file from a markdown file
      writeFile(`${filename.split('.md')[0]}.json`, JSON.stringify(data)),

      mkdir(join(fileURLToPath(dirname(import.meta.url)), '../exoBundle'), {
        recursive: true,
      }),
    ])
  })

  const rootFile = await (
    await readdir('./')
  ).filter((file) => file.includes('exercise.json'))

  rootFile.map(async (file) => {
    // Move each exercise json file in exo directory bundle
    await rename(
      join(fileURLToPath(dirname(import.meta.url)), `../${file}`),
      join(fileURLToPath(dirname(import.meta.url)), `../exoBundle/${file}`),
    )
  })
}
