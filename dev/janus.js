import { save, filter } from './janus-kv.js'
import { roles } from '../data/discord.js'

const { discord } = await import('./janus-discord.js')
await discord.once.READY()
console.log('bot ready!')

// Possible optimisations:
// caching session name to skip find
// only save if used data changed
discord.on.GUILD_MEMBER_UPDATE(async ({ user, roles: userRoles, nick }) => {
  const login = nick?.split(' ', 1)[0]
  if (!login) return
  const [session] = (await filter(`user:${login}`))
  if (!session || session.metadata.discordId !== user.id) return
  await save(session.name, {
    ...session.metadata,
    role: roles.find(role => userRoles.includes(role.id))?.key,
    avatar: user
  })
})


// TODO:
// - provide a route to download a dump of the users
