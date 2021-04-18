export const DEV = process.env.NODE_ENV !== 'production'
export const HASH = process.env.HASH
export const API = location.host.endsWith('platform-au0l.pages.dev')
  ? `https://dev.oct.ovh:2083/${HASH.split('@')[1]}/api`
  : `/api`
