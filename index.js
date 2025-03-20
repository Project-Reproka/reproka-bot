const discord = require('discord.js')
const components = require('./utils/components.js')
require('dotenv').config()

const client = new discord.Client( { intents: 53608447 } )

client.on('ready', () => {
  console.log(`> ${client.user.tag} is online`)
  console.log(`> Loaded ${components.counts().loaded}/${components.counts().unloaded} components`)

  client.user.setActivity('over Reproka', { type: discord.ActivityType.Watching })

  components.callByTrigger('init', client)
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return

  components.callByTrigger('message', message, client)
})

components.load()
client.login(process.env.token)
