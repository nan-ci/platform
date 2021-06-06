const ws = new WebSocket(`wss://gateway.discord.gg/?v=8&encoding=json`)

const ONCE = {}
const ON = {}
let s = null
let intents = 0
let heartbeatAc
const heartbeat = () => {
  console.log('heartbeat')
  heartbeatAc = setTimeout(() => {
    console.log('the client was ZOMBIFED')
    console.log('TODO: try too reconnect+resume!')
    Deno.exit(1)
  }, 1000)
  ws.send(JSON.stringify({ op: 1, d: s }))
}

ws.addEventListener('close', (event) => {
  console.log(event)
  Deno.exit(1)
})

ws.addEventListener('message', (event) => {
  const { t, s, op, d } = JSON.parse(event.data)
  switch (op) {
    case 0: // DISPATCH
      const on = ON[t]
      const once = ONCE[t]
      if (!on) return
      for (const fn of on) fn(d)
      for (const fn of once) fn(d)
      once.clear()
      return
    case 1: // HEARTBEAT
      return heartbeat()
    case 2: // IDENTIFY
      return console.log('IDENTIFY', d)
    case 3: // STATUSUPDATE
      return console.log('STATUSUPDATE', d)
    case 4: // VOICESTATEUPDATE
      return console.log('VOICESTATEUPDATE', d)
    case 6: // RESUME
      return console.log('RESUME', d)
    case 7: // RECONNECT
      return console.log('RECONNECT', d)
    case 8: // REQUESTGUILDMEMBERS
      return console.log('REQUESTGUILDMEMBERS', d)
    case 9: {
      // INVALIDSESSION
      console.log('Invalid Session, verify your token')
      Deno.exit(1)
    }
    case 10: // HELLO
      ws.send(
        JSON.stringify({
          op: 2, // IDENTIFY
          d: {
            token: Deno.env.get('BOT_TOKEN'),
            intents,
            properties: { $os: 'linux', $browser: 'janus', $device: 'janus' },
          },
        }),
      )
      setInterval(heartbeat, d.heartbeat_interval)
      return
    case 11: // HEARTBEATAC
      return clearTimeout(heartbeatAc)
    default:
      console.log(`OP_${op}`, d)
  }
})

const eventTypes = {
  GUILDS: [
    // 'GUILD_CREATE',
    // 'GUILD_UPDATE',
    // 'GUILD_DELETE',
    // 'GUILD_ROLE_CREATE',
    // 'GUILD_ROLE_UPDATE',
    // 'GUILD_ROLE_DELETE',
    // 'CHANNEL_CREATE',
    // 'CHANNEL_UPDATE',
    // 'CHANNEL_DELETE',
    // 'CHANNEL_PINS_UPDATE',
  ],
  GUILD_MEMBERS: [
    // 'GUILD_MEMBER_ADD',
    'GUILD_MEMBER_UPDATE',
    // 'GUILD_MEMBER_REMOVE',
  ],
  GUILD_BANS: [
    // 'GUILD_BAN_ADD',
    // 'GUILD_BAN_REMOVE',
  ],
  GUILD_EMOJIS: [
    // 'GUILD_EMOJIS_UPDATE',
  ],
  GUILD_INTEGRATIONS: [
    // 'GUILD_INTEGRATIONS_UPDATE',
    // 'INTEGRATION_CREATE',
    // 'INTEGRATION_UPDATE',
    // 'INTEGRATION_DELETE',
  ],
  GUILD_WEBHOOKS: [
    // 'WEBHOOKS_UPDATE',
  ],
  GUILD_INVITES: [
    // 'INVITE_CREATE',
    // 'INVITE_DELETE',
  ],
  GUILD_VOICE_STATES: [
    // 'VOICE_STATE_UPDATE',
  ],
  GUILD_PRESENCES: [
    // 'PRESENCE_UPDATE',
  ],
  GUILD_MESSAGES: [
    // 'MESSAGE_CREATE',
    // 'MESSAGE_UPDATE',
    // 'MESSAGE_DELETE',
    // 'MESSAGE_DELETE_BULK',
  ],
  GUILD_MESSAGE_REACTIONS: [
    // 'MESSAGE_REACTION_ADD',
    // 'MESSAGE_REACTION_REMOVE',
    // 'MESSAGE_REACTION_REMOVE_ALL',
    // 'MESSAGE_REACTION_REMOVE_EMOJI',
  ],
  GUILD_MESSAGE_TYPING: [
    // 'TYPING_START',
  ],
  DIRECT_MESSAGES: [
    // 'MESSAGE_CREATE',
    // 'MESSAGE_UPDATE',
    // 'MESSAGE_DELETE',
    // 'CHANNEL_PINS_UPDATE',
  ],
  DIRECT_MESSAGE_REACTIONS: [
    // 'MESSAGE_REACTION_ADD',
    // 'MESSAGE_REACTION_REMOVE',
    // 'MESSAGE_REACTION_REMOVE_ALL',
    // 'MESSAGE_REACTION_REMOVE_EMOJI',
  ],
  DIRECT_MESSAGE_TYPING: [
    // 'TYPING_START',
  ],
}

export const discord = { once: {}, on: {} }

const registerEvent = (type) => {
  const on = (ON[type] = new Set())
  const once = (ONCE[type] = new Set())
  const next = (fn) => once.add(fn)
  discord.on[type] = (fn) => on.add(fn)
  discord.once[type] = () => new Promise(next)
}

Object.values(eventTypes).forEach((types, index) => {
  types.length && (intents |= 1 << index)
  types.forEach(registerEvent)
})

registerEvent('READY')
