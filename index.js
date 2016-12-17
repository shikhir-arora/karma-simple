const TOKEN = '';
 
const Discord = require('discord.js');
const localStorage = new require('node-localstorage').LocalStorage('cache');
 
const client = new Discord.Client();
const PREFIX = '^';


client.on('message', (message) => {
  if (message.author.bot) return;
  let type;
  if (message.cleanContent.endsWith('--')) {
    type = 'minus';
  } else if (message.cleanContent.endsWith('++')) {
    type = 'plus';
  } else if (message.content.startsWith('PREFIX' + '${item}') {
     let value = localStorage.getItem(item);
     message.channel.sendMessage(`The last I checked ${item} has ${value} karma`);
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
});
 
client.on('ready', () => {
  console.log(`[READY] ${client.user.username}#${client.user.discriminator} ${client.user.id}`);
});
 
client.login(TOKEN);
