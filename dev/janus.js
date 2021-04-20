import { save, filter } from './janus-kv.js'

const userEntries = (await filter('user:'))
  .filter((key) => key.metadata.discordId)
  .map(({ name, metadata }) => [
    metadata.discordId,
    { key: name, value: metadata },
  ])

const users = Object.fromEntries(userEntries)

const { discord } = await import('./janus-discord.js')

await discord.once.READY()
console.log('bot ready!')

// for each users with a discord ID and no roles
// fetch roles

discord.on.GUILD_MEMBER_UPDATE(({ user, roles, nick, ...rest }) => {
  // save(`roles:${user.id}`, { roles })
  // console.log(await r.json())
  // if nick match format
  // try to fetch user data
  // if user found, confirm that discordId === user.id
  // update session
  console.log(user.id, 'has', roles.length, 'roles')
})


// TODO:
// - update auth to use login instead of sid (and do not expose sid)
// - fetch data fresh data form the website if the user is not in the cache
// - provide a route to download a dump of the users
