import { readdir, writeFile, mkdir, rename } from 'fs/promises'
import { join } from 'path'
import { readJSExo, exoJsDir } from './build.js'
import { rootDir } from './utils.js'

// returns a flatten array of all the children
const children = (n) =>
  n.children ? [n, ...n.children.flatMap(children)] : [n]

const moveFile = async (file) =>
  await rename(join(rootDir, file), join(rootDir, 'exoBundle', file))

const getTrimValue = (n) => n.value?.trim()
const textContent = (n) =>
  children(n).map(getTrimValue).filter(Boolean).join(' ') || ''

const isH1 = (node) => node.type === 'heading' && node.depth === 1
const isH2 = (node) => node.type === 'heading' && node.depth === 2
const isH3 = (node) => node.type === 'heading' && node.depth === 3
const isP = (node) => node.type === 'paragraph' || node.type === 'text'
const isCODE = (node) => node.type === 'code' || node.type === 'inlineCode'
const isBLOCK = (node) => node.type === 'blockquote'
const isLI = (node) => node.type === 'list'

export const parseContent = (nodeList) => {
  const content = { description: '' }
  let mode,
    test = isP
  for (const node of nodeList) {
    if (!content.title && isH1(node)) {
      content.title = textContent(node)
    } else if (isH2(node)) {
      mode = textContent(node).toLowerCase()
      content[mode] = []
    } else if (mode === 'notions') {
      if (isLI(node)) {
        content.notions = children(node).map(getTrimValue).filter(Boolean)
      }
    } else if (mode === 'instructions') {
      if (isP(node) || isLI(node)) {
        content.instructions =
          children(node).map(getTrimValue).filter(Boolean).join(' ')
      }

    } else if (mode === 'tests') {
      if (isH3(node)) {
        test = { name: textContent(node) }
        content.tests.push(test)
      } else if (test && isCODE(node)) {
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
      content.description += `${textContent(node).trim()}\n`
    }
  }
  return content
}

export const getJsonExoFile = async () => {
  const dirList = await exoJsDir()
  const entries = await readJSExo()
  dirList.map(async (filename) => {
    const data = Object.fromEntries(entries)[filename]
    await Promise.all([
      // Create each exercise json file from a markdown file
      writeFile(`${filename.split('.md')[0]}.json`, JSON.stringify(data)),
      mkdir(join(rootDir, 'exoBundle'), { recursive: true }),
    ])
  })

  // read root directory and move each exo json file into exoBundle directory
  await (await readdir(rootDir))
    .filter((file) => file.includes('exercise.json'))
    .map(moveFile)
}
