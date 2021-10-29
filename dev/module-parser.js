import { readdir, writeFile, rename } from 'fs/promises'
import { join } from 'path'
import { readJSMod, modJsDir, bundleJSONDir } from './build.js'
import { rootDir } from './utils.js'

// returns a flatten array of all the children
const children = (n) =>
  n.children ? [n, ...n.children.flatMap(children)] : [n]

const getTrimValue = (n) => n.value?.trim()
const textContent = (n) =>
  children(n).map(getTrimValue).filter(Boolean).join(' ') || ''

const isH1 = (node) => node.type === 'heading' && node.depth === 1
const isH2 = (node) => node.type === 'heading' && node.depth === 2
const isH3 = (node) => node.type === 'heading' && node.depth === 3
const isP = (node) => node.type === 'paragraph'
const isCODE = (node) => node.type === 'code'
const isLI = (node) => node.type === 'list'

export const parseContent = (nodeList) => {
  const content = { description: '' }
  let mode, exercise = isP
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
    } else if (mode === 'description') {
      if (isP(node)) {
        content.description = children(node)
          .map(getTrimValue)
          .filter(Boolean)
          .join(' ')
      }
    } else if (mode === 'exercise') {
      if (isH3(node)) {
        exercise = { name: textContent(node) }
        content.exercise.push(exercise)
      } else if ( exercise && isCODE(node)) {
        console.log(node)
        exercise.code = textContent(node)
        exercise.lang = node.lang
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

export const generateModJSON = async () => {
  const dirList = await modJsDir()
  const entries = await readJSMod()
  const modulebundle = await bundleJSONDir('modulebundle')
  dirList.map(async (file) => {
    const data = Object.fromEntries(entries)[file]
    await writeFile(`${file.split('.md')[0]}.json`, JSON.stringify(data))
  })

  await (await readdir(rootDir))
    .filter((filename) => filename.includes('module.json'))
    .map((e) => rename(join(rootDir, e), join(modulebundle, e)))
}
