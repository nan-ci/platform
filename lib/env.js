export const DEV = process.env.NODE_ENV !== 'production'
export const HASH = process.env.HASH
export const CI = location.host.endsWith('.platform-nan-dev-8sl.pages.dev')
export const API = CI
  ? `https://dev.oct.ovh:2083/${HASH.split('@')[1]}/api`
  : `/api`
