if (process.version.slice(1).split('.')[0] < 17) throw new Error('Node must be v17+ - please upgrade to the latest version of Node!')

const gist = require('snekgist')
const exec = require('child_process').exec
const os = require('os')
const moment = require('moment')
require('moment-duration-format')
const c = require('ansi-colors')
const config = require('./config.json')
const Ratelimiter = require('./Ratelimiter.js')
const rl = new Ratelimiter()
const randomColor = require('randomcolor')
const Enmap = require('enmap')
require('log-timestamp')('karmabot-git-4.0.0')
const { EmbedBuilder } = require('discord.js')
const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ],
})

client.karmaStore = new Enmap({ name: 'karmaStore', autoFetch: true, fetchAll: true, dataDir: './karmaStore', cloneLevel: 'deep' })

;(async () => {
  await client.karmaStore.defer
  console.log(c.red.bold('Enmap Init: ' + client.karmaStore.size + ' keys loaded'))
})().catch(err => {
  console.error(c.bgRed.underline(err))
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  const check = await rl.check(message)
  if (check === true) {
    if (message.cleanContent.startsWith(config.prefix)) {
      if (message.channel.type === 'dm') return
      const keyword = message.cleanContent.replace(config.prefix, '').trim()

      if (!client.karmaStore.has(keyword)) {
        client.karmaStore.set(keyword, {
          numKarma: 0
        })
      }
    message.channel.send(`${keyword} has **${client.karmaStore.getProp(keyword, 'numKarma') || 0}** Karma!`)
    } else if ((message.cleanContent.endsWith('--')) || message.cleanContent.endsWith('++')) {
      if (message.channel.type === 'dm') return
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
      console.log(`[KARMAOPS]: [USER ${c.green.bold(message.author.id)}] karma-op success: ${c.cyan.bold(keyword)} ${c.red.bold.underline(type)}`)
      message.channel.send(`[KARMA] **${keyword}** has **${client.karmaStore.getProp(keyword, 'numKarma') || 0}** Karma. To lookup later use  **${config.prefix}**  and type **${config.prefix} ${keyword}**`)
   
    }
  }

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    message.reply('Hi there! Please type `@KarmaBot help` for help using this bot or `@KarmaBot stats` to get bot statistics.')
    return message.react('\u2705')
  }
  if ((message.content.startsWith(`<@!${client.user.id}>` + ' help')) || message.content.startsWith(`<@${client.user.id}>` + ' help')) {
    if (message.channel.type === 'dm') return
    try {
      const embed = new EmbedBuilder()
        .setTitle('KarmaBot Help & Information')
        .setThumbnail(message.guild.iconURL())
        .setURL('https://discord.gg/dUkPxzv6em')
        .setColor(randomColor())
        .setDescription('**KarmaBot Help and Information (basic usage, invite URL, support)**')
        .addFields(
            { name:'**❯❯ Add Karma (++):**', value: 'To **add or increase** karma, type *any* keyword (can be a username, emoji, or any string of text) followed by two plus symbols **++** For example, typing **keyword++** will increase the karma of keyword by one.', inline: true },
            { name:'**❯❯ Subtract Karma (--):**', value: 'To **subtract or decrease** karma, type *any* keyword (can be a username, emoji, or any string of text) followed by two minus symbols **--** For example, typing **keyword--** will decrease the karma of keyword by one.', inline: true },
            { name:'**❯❯ Lookup Karma (>k):**', value: 'To **lookup** karma, type **>k** followed by the keyword to lookup. For example, typing **>k keyword** will return the karma of keyword. This is shared across all guilds using KarmaBot.', inline: true },
            { name:'**❯❯ Blacklist (Per Guild):**', value: 'To **blacklist** a user from being able to add or subtract Karma in a guild, create the role **NoKarma** and assign it to the users you wish to blacklist. Users can still lookup Karma, so this can act as a way for admins/mods to, for example, award points to users without the users all being able to add/remove Karma. By default this bot will take commands from any user, but messages [are internally rate-limited for spam protection](https://cdn.rawgit.com/shikhir-arora/karma-simple/3848016d/Ratelimiter.js).', inline: true },
            { name:'**❯❯ Stats:**', value: 'For **KarmaBot Stats,** type `@KarmaBot stats` - fun stuff!', inline: true },
            { name:'**❯❯ Support:**', value: '**For support, visit:** [our Discord server](https://discord.gg/dUkPxzv6em) or [GitHub](https://github.com/shikhir-arora/karma-simple/issues).', inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Project by vlexar#0001 | KarmaBot Help' })
      await message.reply({ embeds: [embed] })
    } catch (e) {
      console.error(e)
    }
  }

  if ((message.content.startsWith(`<@!${client.user.id}>` + ' stats')) || message.content.startsWith(`<@${client.user.id}>` + ' stats')) {
    try {
      const embed = new EmbedBuilder()
        .setTitle('KarmaBot Stats')
        .setThumbnail(client.user.displayAvatarURL())
        .setURL('https://discord.gg/dUkPxzv6em')
        .setColor(randomColor())
        .setDescription('**KarmaBot Stats/Info**')
        .addFields(
            { name: '**❯❯ Users:**', value: `${client.users.cache.size}`},
            { name: '**❯❯ Channels:**', value: `${client.channels.cache.size}`},
            { name: '**❯❯ Shards:**', value: `${client.ws.shards.size}` },
            { name: '**❯❯ Uptime:**', value: moment.duration(process.uptime(), 'seconds').format('dd:hh:mm:ss')},
            { name: '**❯❯ CPU:**', value: `${os.cpus().length}x ${os.cpus()[0].model}`},
            { name: '**❯❯ Gateway Ping:**', value: `${client.ws.ping.toFixed(5)} ms`},
            { name: '**❯❯ Load Average:**', value: `${os.loadavg()[1]}`},
            { name: '**❯❯ Memory Usage:**', value: `${(process.memoryUsage().rss / 1048576).toFixed(2)}MB / ${(os.totalmem() / 1073741824).toFixed(2)}GB`},
            { name: '**❯❯ System:**', value: `${os.type()} - ${os.arch()} ${os.release()}`},
            { name: '**❯❯ Node Version:**', value: process.version},
            { name: '**❯❯ Bot Version:**', value: '4.0.0'},
            { name: '**❯❯ Discord.js:**', value: `v${require('discord.js').version}`},
            { name: '**❯❯ GitHub:**', value: '[GitHub Repo](https://github.com/shikhir-arora/karma-simple).', inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Project by vlexar#0001 | KarmaBot Stats'})
      await message.reply({ embeds: [embed] })
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
      let evaled = await eval(code) // eslint-disable-line no-eval

      if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled, { depth: 0 }) }

      if (evaled.includes(client.token || config.token)) {
        evaled = evaled.replace(client.token, 'REDACTED!')
      }

      if (clean(evaled).length > 1800) {
        await gist(clean(evaled))
          .then(res => {
            const embed = new EmbedBuilder()
              .setTitle('Eval output exceeds 2000 characters. View on Gist.')
              .setURL(`${res.html_url}`)
              .setColor(randomColor())
              .setDescription(`Eval output exceeds 2000 characters. View Gist [here](${res.html_url}).`)
              .setTimestamp()
              .setFooter({ text: 'Eval Output'})
            message.channel.send({ embeds: [embed] }).catch((e) => message.channel.send(e.message))
          })
      } else {
        message.channel.send(clean(evaled), {
          code: 'fix'
        })
      }
    } catch (err) {
      console.log(err)
      err = err.toString() // eslint-disable-line no-ex-assign
      if (err.includes(client.token || config.token)) {
        err = err.replace(client.token, 'REDACTED!') // eslint-disable-line no-ex-assign
      }
      message.channel.send(`\`ERROR\` \`\`\`fix\n${clean(err)}\n\`\`\``)
    }
  }

  if (message.content.startsWith(config.adminprefix + 'exec')) {
    if (message.author.id !== config.ownerID) return
    exec(args.join(' '), async (e, stdout, stderr) => {
      if (stdout.length > 1800 || stderr.length > 1800) {
        await gist(`${stdout}\n\n${stderr}`)
          .then(res => {
            const embed = new EmbedBuilder()
              .setTitle('Console output exceeds 2000 characters. View on Gist.')
              .setURL(`${res.html_url}`)
              .setColor(randomColor())
              .setDescription(`Console output exceeds 2000 characters. View Gist [here](${res.html_url}).`)
              .setTimestamp()
              .setFooter({ text: 'Exec Output'})
            message.channel.send({ embeds: [embed] }).catch((e) => message.channel.send(e.message))
          })
      } else {
        stdout && message.channel.send(`\`INFO:\`\n\n\`\`\`fix\n${stdout}\`\`\``)
        stderr && message.channel.send(`\`ERRORS:\`\n\n\`\`\`fix\n${stderr}\`\`\``)
        if (!stderr && !stdout) { message.react('\u2705') }
      }
    })
  } 
})


client.on('ready', () => {
  console.log(`[READY] Connected as ${c.red.bold.underline(client.user.username)}#${c.cyan.bold(client.user.discriminator)} ${c.green.bold(client.user.id)}`)
  setInterval(() => client.user.setActivity('@KarmaBot help', { type: ActivityType.Watching }), 90000)

})

client.on('guildCreate', (guild) => {
  console.log(`New guild joined: ${c.blue.bold.underline(guild.name)} (id: ${c.yellow.italic(guild.id)}). This guild has ${c.green.underline(guild.memberCount)} members!`)

})

client.on('guildDelete', (guild) => {
  console.log(`I have been removed from: ${c.red.bold.underline(guild.name)} (id: ${c.yellow.bold(guild.id)})`)

})

client.on('disconnect', (event) => {
  setTimeout(() => client.destroy().then(() => client.login(config.token)), 10000)
  console.log(c.bgRed.underline(`[DISCONNECT] Notice: Disconnected from gateway with code ${event.code} - Attempting reconnect.`))
})

client.on('reconnecting', () => {
  console.log(c.bgYellow.italic('[NOTICE] ReconnectAction: Reconnecting to Discord...'))
})

client.on('rateLimit', console.log)
client.on('error', console.error)
client.on('warn', console.warn)

process.on('unhandledRejection', (error) => {
  console.error(c.bgRed(`Uncaught Promise Error: \n${error.stack}`))
})

process.on('uncaughtException', (err) => {
  const errmsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './')
  console.error(c.red.bold(errmsg))
})

client.login(config.token)