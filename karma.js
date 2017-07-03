const Discord = require('discord.js');
const config = require('./config.json'); // use the provided 'config.json.example' and edit accordingly. Save as config.json before running.
const localStorage = new require('node-localstorage').LocalStorage('karmafiles'); // Change 'karmafiles' to edit the directory name where the files are stored in localstorage
const Ratelimiter = require('./Ratelimiter.js');
const rl = new Ratelimiter();
const util = require('util');

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
					color: Math.floor(Math.random() * (0xFFFFFF + 1)),
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					},
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
					color: Math.floor(Math.random() * (0xFFFFFF + 1)),
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					},
					description: `[KARMA] **${keyword}** has **${count}** Karma. To lookup later use  **${config.prefix}**  and type **${config.prefix} ${keyword}**`,
					timestamp: new Date()
				}
			});

		}
	} else {
		if (config.explain) message.reply(`Sorry, you have to wait ${check} seconds!`); // Keep this false unless you wish for the bot to print when users exceed the ratelimiter.
	}
});

const clean = text => {
	if (typeof (text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

client.on("message", message => {
	const args = message.content.split(" ").slice(1);

	if (message.content.startsWith(config.adminprefix + "eval")) {
		if (message.author.id !== config.ownerID) return;
		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);

			message.channel.send(clean(evaled), {
				code: "xl"
			});
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	}
});


client.on('ready', () => {
	console.log(`[READY] Connected as ${client.user.username}#${client.user.discriminator} ${client.user.id}`);
	client.user.setGame(config.playing);
});

client.on('disconnect', () => {
	setTimeout(() => client.destroy().then(() => client.login(config.token)), 10000)
	console.log(`[DISCONNECT] Notice: Disconnected from gateway. Attempting reconnect.`);
});

client.on('reconnecting', () => {
	console.log(`[NOTICE] ReconnectAction: Reconnecting to Discord...`);
});

client.on('error', console.error);
client.on('warn', console.warn);

client.login(config.token);