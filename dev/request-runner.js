import { API } from './mocks.js'
import { writeFile, readFile } from 'fs/promises'

const args = JSON.parse(process.argv[2])
const db = `/tmp/${args.hash}.kv.json`
NAN.entries = await readFile(db, 'utf8').then(JSON.parse, () => ({}))
process.stdin.setEncoding('utf8')
console.log = console.warn = console.info = console.debug = console.error
const response = await API({ ...args, body: process.stdin })
process.stdout.write(`${JSON.stringify(response)}\n`)
writeFile(db, JSON.stringify(NAN.entries), 'utf8').catch(console.error)
