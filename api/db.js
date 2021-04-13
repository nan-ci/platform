const get = async (key) => (await NAN.getWithMetadata(key))?.metadata
const set = (key, metadata) => NAN.put(key, '', { metadata })
const del = key => NAN.delete(key)
const put = (key, value, opts) => NAN.put(key, value, opts)
const update = async (key, p) => set(key, { ...(await get(key)), ...p })
const find = async (prefix) => (await NAN.list({ prefix, limit: 1 })).keys[0]
const filter = async (prefix) => {
  let cursor, list
  const results = []
  while ((list = await NAN.list({ prefix, cursor }))) {
    results.push(...list.keys)
    if (list.list_complete) break
    cursor = list.cursor
  }
  return results
}

export { get, set, del, put, update, find, filter }
