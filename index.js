// CONFIG //

const TOKEN = '';    // SET OAUTH2 TOKEN FOR BOT TO CONNECT TO SERVER
const PREFIX = '';   // SET PREFIX FOR KARMA LOOKUPS
const EXPLAIN = false;

const Discord = require('discord.js');
const localStorage = new require('node-localstorage').LocalStorage('cache');  // CAN CHANGE 'cache' TO ANY FOLDER FOR KARMAFILES
const Ratelimiter = require('./Ratelimiter.js');
const rl = new Ratelimiter();

const client = new Discord.Client();

client.on('message', (message) => {
  if (message.author.bot) return;
  const check = rl.check(message);
  if (check === true) {
    if (message.cleanContent.startsWith(PREFIX)) {
      const item = message.cleanContent.replace(PREFIX, '').trim();
      const count = localStorage.getItem(item) || 0;
      message.reply(`${item} has ${count} karma!`);
    } else {
      let type;
      if (message.cleanContent.endsWith('--')) {
        type = 'minus';
      } else if (message.cleanContent.endsWith('++')) {
        type = 'plus';
      } else {
        return;
      }
      const item = message.cleanContent.replace(/(\+\+|--)$/, '').trim().toLowerCase();
      let count = localStorage.getItem(item) || 0;
      if (type === 'minus') count--;
      else if (type === 'plus') count++;
      console.log(`[KARMA] ${item} ${type}`);
      localStorage.setItem(item, count);
      message.channel.sendMessage(`${item} has ${count} karma!`);
    }
  } else {
    if (EXPLAIN) message.reply(`Sorry, you have to wait ${check} seconds!`);
  }
});

client.on('ready', () => {
  console.log(`[READY] ${client.user.username}#${client.user.discriminator} ${client.user.id}`);
});

client.login(TOKEN);
