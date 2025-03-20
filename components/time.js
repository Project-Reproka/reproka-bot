const https = require('https')
const discord = require('discord.js')

async function ping(message, client) {
  var content = message.content

  if (content.startsWith('r!time')) {
    if (content.split(' ').length > 1) {
      var thing = content.split(' ')[1]
      var result = await fetch('https://reproka.net/api/clock/at/' + thing)

      if (result.status != 200) {
        message.reply('Error ' + result.status)
        return
      }

      var body = await result.json()
      
      var s = body.seasonal
      var l = body.lunar

      var se = `${s.days} ${s.month[1]}, ${s.year}`
      var lu = `${l.day} ${l.month[1]}`
      var ti = `${body.time.collapsed}`

      var embed = new discord.EmbedBuilder()
        .setColor('#5577ff')
        .setTitle('Reproka Time (at point)')
        .setDescription(`${se}\n${lu}\n${ti}`)
        .setFooter({
          iconURL: 'https://reproka.net/overexposed.png',
          text: 'Reproka Bot'
        })

      message.reply({ embeds: [embed] })
    } else {
      var result = await fetch('https://reproka.net/api/clock')

      if (result.status != 200) {
        message.reply('Error ' + result.status)
        return
      }

      var body = await result.json()
      
      var s = body.seasonal
      var l = body.lunar

      var se = `${s.days} ${s.month[1]}, ${s.year}`
      var lu = `${l.day} ${l.month[1]}`
      var ti = `${body.time.collapsed}`

      var embed = new discord.EmbedBuilder()
        .setColor('#5577ff')
        .setTitle('Reproka Time')
        .setDescription(`${se}\n${lu}\n${ti}`)
        .setFooter({
          iconURL: 'https://reproka.net/overexposed.png',
          text: 'Reproka Bot'
        })
      
      message.reply({ embeds: [embed] })
    }
  }
}

module.exports = {pingClock: ping}
