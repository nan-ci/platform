import { API } from './mocks.js'

// Forward to the mock of cloudflare worker
// node dev/request-runner.js '{"rawHeaders": [],"method": "GET", "url": "/api/link/github"}'

process.stdin.setEncoding('utf8')
const response = await API({
  ...JSON.parse(process.argv[2]),
  body: process.stdin,
})

console.log(JSON.stringify(response))

// TODO: replace header Location

