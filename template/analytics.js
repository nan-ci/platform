export default () =>
  process.env.NODE_ENV === 'developement'
    ? '<!-- analytics placeholder -->'
    : `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "b1204f87f6f64584bd989c4c1a1e91d0"}'></script>`
