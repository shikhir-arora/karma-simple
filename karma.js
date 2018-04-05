if (process.version.slice(1).split('.')[0] < 8) throw new Error(`Node must be v8+ - please upgrade to v8 or the latest v9.`)

const Discord = require('discord.js')
const hastebin = require('hastebin-gen')
const exec = require('child_process').exec
const os = require('os')
const moment = require('moment')
require('moment-duration-format')
const config = require('./config.json') // use the provided 'config.json.example' and edit accordingly. Save as config.json before running.
const request = require('request-promise-native')
const Ratelimiter = require('./Ratelimiter.js')
const rl = new Ratelimiter()
const client = new Discord.Client()
const Enmap = require('enmap')
const EnmapMongo = require('enmap-mongo')
client.karmaStore = new Enmap({ provider: new EnmapMongo({
  name: `karmaStore`,
  dbName: `enmap`,
  url: ''
})
})

client.on('message', async (message) => {
  if (message.author.bot) return
  const check = await rl.check(message)
  if (check === true) {
    if (message.cleanContent.startsWith(config.prefix)) {
      if (message.channel.type === 'dm') return
      if ((message.guild.roles.find('name', 'NoKarma')) && (message.member.roles.has(message.guild.roles.find('name', 'NoKarma').id))) {
        message.reply(`You are not allowed to lookup Karma. Please contact a server mod/admin/staff member. Type \`@KarmaBot help\` for more info.`)
        return message.react('\uD83D\uDD34')
      }
      const keyword = message.cleanContent.replace(config.prefix, '').trim()

      if (!client.karmaStore.has(keyword)) {
        client.karmaStore.set(keyword, {
          numKarma: 0
        })
      }
      try {
        await message.reply({
          embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL
            },
            description: `${keyword} has **${client.karmaStore.getProp(keyword, 'numKarma') || 0}** Karma!`,
            footer: {
              text: `KarmaBot by .vlexar#0001`
            },
            timestamp: new Date()
          }
        })
      } catch (e) {
        console.error(e)
      }
    } else if ((message.cleanContent.endsWith('--')) || message.cleanContent.endsWith('++')) {
      if (message.channel.type === 'dm') return
      if ((message.guild.roles.find('name', 'NoKarma')) && (message.member.roles.has(message.guild.roles.find('name', 'NoKarma').id))) {
        message.reply(`You are not allowed to add or subtract Karma at this time. Please contact a server mod/admin/staff member. Type \`@KarmaBot help\` for more info.`)
        return message.react('\uD83D\uDD34')
      }
      let type
      if (message.cleanContent.endsWith('--')) {
        type = 'minus'
      } else if (message.cleanContent.endsWith('++')) {
        type = 'plus'
      } else {
        return
      }
      const keyword = message.cleanContent.replace(/([+-]{2,})$/m, '').trim()

      if (!client.karmaStore.has(keyword)) {
        client.karmaStore.set(keyword, {
          numKarma: 0
        })
      }
      if (keyword === '') return
      let currentKarma = client.karmaStore.getProp(keyword, 'numKarma')
      if (type === 'minus') client.karmaStore.setProp(keyword, 'numKarma', --currentKarma)
      else if (type === 'plus') client.karmaStore.setProp(keyword, 'numKarma', ++currentKarma)
      console.log(`[KARMA] ${keyword} ${type}`)
      try {
        await message.channel.send({
          embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL
            },
            description: `[KARMA] **${keyword}** has **${client.karmaStore.getProp(keyword, 'numKarma') || 0}** Karma. To lookup later use  **${config.prefix}**  and type **${config.prefix} ${keyword}**`,
            footer: {
              text: `KarmaBot by .vlexar#0001`
            },
            timestamp: new Date()
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  if (message.content.startsWith(`<@${client.user.id}>` + ` help`)) {
    if (message.channel.type === 'dm') return
    try {
      const embed = new Discord.MessageEmbed()
        .setTitle(`KarmaBot Help & Information`)
        .setThumbnail(message.guild.iconURL)
        .setURL(`https://discordbots.org/bot/255110583072980992`)
        .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
        .setDescription(`**KarmaBot Help and Information (basic usage, invite URL, support)**`)
        .addField(`**❯❯ Add Karma (++):**`, `To **add or increase** karma, type *any* keyword (can be a username, emoji, or any string of text) followed by two plus symbols **++** For example, typing **keyword++** will increase the karma of keyword by one.`, true)
        .addField(`**❯❯ Subtract Karma (--):**`, `To **subtract or decrease** karma, type *any* keyword (can be a username, emoji, or any string of text) followed by two minus symbols **--** For example, typing **keyword--** will decrease the karma of keyword by one.`, true)
        .addField(`**❯❯ Lookup Karma (>k):**`, `To **lookup** karma, type **>k** followed by the keyword to lookup. For example, typing **>k keyword** will return the karma of keyword. This is shared across all guilds using KarmaBot.`, true)
        .addField(`**❯❯ Blacklist (Per Guild):**`, `To **blacklist** a user from being able to lookup, add or subtract Karma in a guild, create the role **NoKarma** and assign it to the users you wish to blacklist. By default this bot will take commands from any user, but messages [are internally rate-limited for spam protection](https://cdn.rawgit.com/shikhir-arora/karma-simple/3848016d/Ratelimiter.js).`, true)
        .addField(`**❯❯ Stats:**`, `For **KarmaBot Stats,** type \`@KarmaBot stats\` - fun stuff!`, true)
        .addBlankField()
        .addField(`**❯❯ Invite KarmaBot:**`, `**To Invite KarmaBot**, [click here (requires Manage Server permissions)](https://bot.discord.io/karmabot).`, true)
        .addField(`**❯❯ Support:**`, `**For support, visit:** [our Discord server](https://discord.io/ec) or [GitHub](https://github.com/shikhir-arora/karma-simple/issues).`, true)
        .setFooter(`Project by .vlexar#0001 | KarmaBot Help`)
        .setTimestamp()
      await message.reply({embed})
    } catch (e) {
      console.error(e)
    }
  }

  if (message.content.startsWith(`<@${client.user.id}>` + ` stats`)) {
    try {
      const embed = new Discord.MessageEmbed()
        .setTitle(`KarmaBot Stats`)
        .setURL(`https://discordbots.org/bot/255110583072980992`)
        .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
        .setDescription(`**KarmaBot Stats/Info**`)
        .addField(`**❯❯ Guilds:**`, `${client.guilds.size.toLocaleString()}`, false)
        .addField(`**❯❯ Users:**`, `${client.users.size.toLocaleString()}`, false)
        .addField(`**❯❯ Uptime:**`, moment.duration(os.uptime(), 'seconds').format('dd:hh:mm:ss'), false)
        .addField(`**❯❯ Gateway Ping:**`, `${client.ping.toFixed()} ms`, false)
        .addField(`**❯❯ Load Average:**`, `${os.loadavg()[1].toFixed(3)}`, false)
        .addField(`**❯❯ Memory Usage:**`, `${(process.memoryUsage().rss / 1048576).toFixed(2)}MB / ${(os.totalmem() / 1073741824).toFixed(2)}GB`, false)
        .addField(`**❯❯ System:**`, `${os.type()} - ${os.arch()} ${os.release()}`, false)
        .addField(`**❯❯ Node Version:**`, process.version, false)
        .addField(`**❯❯ Discord.js:**`, `v${Discord.version}`, false)
        .addField(`**❯❯ GitHub:**`, `[GitHub Repo](https://github.com/shikhir-arora/karma-simple).`, true)
        .setFooter(`Project by .vlexar#0001 | KarmaBot Stats`)
        .setTimestamp()
      await message.reply({embed})
    } catch (e) {
      console.error(e)
    }
  }

  const clean = (text) => {
    if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
  }
  const args = message.content.split(' ').slice(1)

  if (message.content.startsWith(config.adminprefix + 'eval')) {
    if (message.author.id !== config.ownerID) return
    try {
      const code = args.join(' ')
      let evaled = await eval(code)

      if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled, { depth: 0 }) }

      if (evaled.includes(client.token || config.token)) {
        evaled = evaled.replace(client.token, 'REDACTED!')
      }

      if (clean(evaled).length > 2000) {
        await hastebin(clean(evaled), 'hs')
          .then(r => {
            const embed = new Discord.MessageEmbed()
              .setTitle(`Eval output exceeds 2000 characters. View on Hastebin.`)
              .setURL(r)
              .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
              .setDescription(`Eval output exceeds 2000 characters. View Hastebin [here](${r}).`)
              .setFooter(`Eval Output`)
              .setTimestamp()
            message.channel.send({embed}).catch((e) => message.channel.send(e.message))
          })
      } else {
        message.channel.send(clean(evaled), {
          code: 'fix'
        })
      }
    } catch (err) {
      console.log(err)
      err = err.toString()
      if (err.includes(client.token || config.token)) {
        err = err.replace(client.token, 'REDACTED!')
      }
      message.channel.send(`\`ERROR\` \`\`\`fix\n${clean(err)}\n\`\`\``)
    }
  }

  if (message.content.startsWith(config.adminprefix + 'exec')) {
    if (message.author.id !== config.ownerID) return
    exec(args.join(' '), async (e, stdout, stderr) => {
      if (stdout.length > 2000 || stderr.length > 2000) {
        await hastebin(`${stdout}\n\n${stderr}`, 'hs')
          .then(r => {
            const embed = new Discord.MessageEmbed()
              .setTitle(`Console output exceeds 2000 characters. View on Hastebin.`)
              .setURL(r)
              .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
              .setDescription(`Console output exceeds 2000 characters. View Hastebin [here](${r}).`)
              .setFooter(`Exec Output`)
              .setTimestamp()
            message.channel.send({embed}).catch((e) => message.channel.send(e.message))
          })
      } else {
        stdout && message.channel.send(`INFO: \n\`\`\`fix\n${stdout}\n\`\`\``)
        stderr && message.channel.send(`ERRORS: \n\`\`\`fix\n${stderr}\n\`\`\``)
        if (!stderr && !stdout) { message.react('\u2705') }
      }
    })
  }
})

function discordBotsOrg () {
  return request.post({
    uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
    headers: {
      Authorization: ''
    },
    json: true,
    body: {
      server_count: client.guilds.size
    }
  })
}

function discordBotsPw () {
  return request.post({
    uri: `https://bots.discord.pw/api/bots/${client.user.id}/stats`,
    headers: {
      Authorization: ''
    },
    json: true,
    body: {
      server_count: client.guilds.size
    }
  })
}

function botlistSpace () {
  return request.post({
    uri: `https://botlist.space/api/bots/${client.user.id}`,
    headers: {
      Authorization: ''
    },
    json: true,
    body: {
      server_count: client.guilds.size
    }
  })
}

client.on('ready', () => {
  console.log(`[READY] Connected as ${client.user.username}#${client.user.discriminator} ${client.user.id}`)
  client.user.setActivity(`@KarmaBot help`)

  discordBotsOrg()
  discordBotsPw()
  botlistSpace()
})

client.on('guildCreate', (guild) => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)

  discordBotsOrg()
  discordBotsPw()
  botlistSpace()
})

client.on('guildDelete', (guild) => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)

  discordBotsOrg()
  discordBotsPw()
  botlistSpace()
})

client.on('disconnect', (event) => {
  setTimeout(() => client.destroy().then(() => client.login(config.token)), 10000)
  console.log(`[DISCONNECT] Notice: Disconnected from gateway with code ${event.code} - Attempting reconnect.`)
})

client.on('reconnecting', () => {
  console.log(`[NOTICE] ReconnectAction: Reconnecting to Discord...`)
})

client.on('error', console.error)
client.on('warn', console.warn)

process.on('unhandledRejection', (error) => {
  console.error(`Uncaught Promise Error: \n${error.stack}`)
})

process.on('uncaughtException', (err) => {
  let errmsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './')
  console.error(errmsg)
})

client.login(config.token)
