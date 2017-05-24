/* Works with 'newer' versions of Node. This is tested with v7.4.0+, though I highly recommend the latest version */

const Discord = require('discord.js');
const config = require('./config.json'); // use the provided 'config.json.example' and edit accordingly. Save as config.json before running.
const localStorage = new require('node-localstorage').LocalStorage('karmafiles'); // Change 'karmafiles' to edit the directory name where the files are stored in localstorage
const Ratelimiter = require('./Ratelimiter.js');
const rl = new Ratelimiter();

const client = new Discord.Client();

client.on('message', (message) => {
  if (message.author.bot) return;
  const check = rl.check(message);
  if (check === true) {
    if (message.cleanContent.startsWith(config.prefix)) {
      const keyword = message.cleanContent.replace(config.prefix, '').trim(); // Inputs ARE case sensitive; i.e. "test" and "Test" are different entries. To change to case-insensitive, replace .trim(); to .trim().toLowerCase(); 
      const count = localStorage.getItem(keyword) || 0;
      message.reply({
        embed: {
          color: 1146986,
          description: `${keyword} has **${count}** Karma!`,
          timestamp: new Date()
        }
      });

    } else {
      let type;
      if (message.cleanContent.endsWith('--')) {
        type = 'minus';
      } else if (message.cleanContent.endsWith('++')) {
        type = 'plus';
      } else {
        return;
      }
      const keyword = message.cleanContent.replace(/([+-]{2,})$/m, '').trim(); // Inputs ARE case sensitive; i.e. "test" and "Test" are different entries. To change to case-insensitive, replace .trim(); to .trim().toLowerCase(); 
      let count = localStorage.getItem(keyword) || 0;
      if (type === 'minus') count--;
      else if (type === 'plus') count++;
      console.log(`[KARMA] ${keyword} ${type}`);
      localStorage.setItem(keyword, count);
      message.channel.send({
        embed: {
          color: 11027200,
          description: `[KARMA] **${keyword}** has **${count}** Karma. To lookup later use  **${config.prefix}**  and type **${config.prefix} ${keyword}**`,
          timestamp: new Date()
        }
      });

    }
  } else {
    if (config.explain) message.reply(`Sorry, you have to wait ${check} seconds!`); // Simple ratelimiter message displayed if spamming, change the "explain": field in config.json (to false, default is true) to stop this warning message from being sent in your server (though it will still be working)
  }
});

client.on('ready', () => {
  console.log(`[READY] Connected as ${client.user.username}#${client.user.discriminator} ${client.user.id}`);
  client.user.setGame(config.playing);
});

client.on('disconnect', () => {
  setTimeout(() => client.destroy().then(() => client.login(config.token)), 15000)
  console.log(`[DISCONNECT] Notice: Disconnected from gateway. Attempting reconnect.`);
});

client.on('error', console.error);
client.on('warn', console.warn);

client.login(config.token);
