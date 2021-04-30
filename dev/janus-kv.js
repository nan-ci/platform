// CLOUDFLARE KV
const ACCOUNT_ID = '94917a33bd06f373d7688a39912e51c8'
const KV_NAMESPACE = 'a835efada9c74830884310cec84a0bee'
const CF_API = [
  'https://api.cloudflare.com/client/v4',
  `accounts/${ACCOUNT_ID}`,
  `storage/kv/namespaces/${KV_NAMESPACE}`,
].join('/')

const Authorization = `Bearer ${Deno.env.get('KV_TOKEN')}`
const headers = { Authorization, 'Content-Type': 'application/json' }
const kv = async (path, request) => {
  console.log(`${CF_API}${path}`)
  const res = await fetch(`${CF_API}${path}`, { ...request, headers })
  const data = await res.json()
  if (data.success) return data
  const message =
    data.errors?.[0]?.message || data.error || `Unk ${data.code || ''}`
  console.error(data)
  throw Object.assign(new Error(message), data)
}

const list = async (prefix, cursor = '') => {
  const search = new URLSearchParams({ prefix, cursor })
  const { result, result_info } = await kv(`/keys?${search}`)
  return { keys: result, cursor: result_info.cursor }
}

export const filter = async (prefix) => {
  let keys, cursor
  const results = []
  while (({ keys, cursor } = await list(prefix, cursor))) {
    results.push(...keys)
    if (!cursor) break
  }
  return results
}

export const save = (key, metadata) =>
  kv(`/values/${key}`, { method: 'PUT', body: { value: '', metadata } })
