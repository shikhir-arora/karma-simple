
# karma-simple

> A simple, lightweight and functional [Discord](https://discordapp.com/) Karma tracking bot for guild members.

## Screenshot In Action 
![karma-simple](https://i.imgur.com/b7aDUOK.jpg)

GIF: https://i.imgur.com/hqehZjR.gif

## Installation 

The bot is built for Discord using [discord.js](https://github.com/hydrabolt/discord.js) - for ease of access, we are including an install script for macOS/Linux users.


## Requirements:

> Node.js version v8.0.0+ (to check your node version, you can type  `node --version` - to update Node, you can use [nvm](http://nvm.sh) and `nvm install latest` or your package manager (like `apt-get` or `yum`) to update.

> Node manages the packages we need, which are found in `package.json` and include:

- discord-js 
- erlpack 
- node-localstorage
- uws for faster websockets


which are handled by `npm` through the installer script.

---

## Install

### macOS/Linux: Installer Script

 ```wget -qO- https://raw.githubusercontent.com/shikhir-arora/karma-simple/master/installer.sh | bash```

*You may need to run this with sudo depending on your permissions!*

### Windows

Windows instructions and a script coming shortly.

For most, it can be installed via. npm: `npm install karma-simple` which manages everything.

---

- Manual instruction:

- Clone the repo -

```
git clone --recursive --depth 1 https://github.com/shikhir-arora/karma-simple.git 

```

- Change directories to `karma-simple` and once there, run `npm install -g` to install the packages needed.

- Continue below as normal to edit `config.json` 


## Configuration (for all users!)

You **must** edit the `config.json.example` file. Insert your bot token and change the prefix and game if you wish to do so. The game is what the bot will show as "Playing _"

**Save the file as `config.json` when complete. This can be before or after the installer script.**


## Getting a Bot Token and Invite Link
		
If you have done this before, then this should be pretty straightforward. If not, go visit https://discordapp.com/developers/applications/me/create to create an application. Name the application with something you want to name it and save it - then choose "generate a Bot user" afterwords and generate the token, client ID, etc.

If you plan to give your bot to other servers, check the "Public Bot" when generating it, so others can use your invite link. Otherwise, it will only work if (you) - the person who created the bot token - invites the bot.

	**Save your client ID and token. They are different things :-) **

There are better guides out there, but most who would use this kind of tool likely are fine with getting this part finished. But, [here is a good guide from jagrosh - this page applies for getting a token and client ID](https://github.com/jagrosh/MusicBot/wiki/Getting-a-Bot-Token)

Once you do get the client ID and token, for the invite link, if you wish I have populated a pre-made form: https://discordapi.com/permissions.html#201673792 in which you can enter your bot client ID in and it will generate the proper invite link with permissions and the bot will be assigned a role that is the name of your Bot application upon joining the server (so if you call the bot KarmaBot, it will get a role called KarmaBot with the right permissions - if that link is used)


## Run

**Ensure you are in the `karma-simple` directory!**

- To run, simply type ```node karma.js``` (may need elevated permissions)

- Please see the section below though!

- To keep this bot running in the console as a background task so it does not stop when the console process terminates/times out, use a process manager such as** [pm2](https://github.com/Unitech/pm2) **(recommended) or a terminal multiplexer like** [tmux](https://tmux.github.io)


### pm2 - Strongly Recommended 

> pm2 can be found here: https://github.com/Unitech/pm2

You can read their quick install instructions, it takes just a minute. Please make sure you run `pm2 update` if you have pm2 but haven't updated in a while. It is seamless.

Once installed, instead of using `node karma.js` we go/`cd` into our same `karma-simple` directory and can run:

`pm2 start karma.js --name "somename"` where you can edit somename to call your application.

> **RUNNING AS SYSTEMD** Once we did all this with pm2, we can have it so it will restart on things like server reboots. For Linux, `systemd` manages the startup tasks. Once we started the bot, we can simply run `pm2 startup systemd` which will take your pm2 projects and run them in the systemd for autostartup on harder reboots.

  ```bash
  
  pm2 unstartup [platform]                    disable and clear auto startup    
  pm2 startup [platform]                      setup script for pm2 at boot   
  
  where [platform]=systemd,upstart,launchd,rcd   # one of these, with Linux it is just systemd
 
 ```
 (this step was optional re: systemd, but it is a good step to take and only is a few seconds to enable as pm2 will automate the config)
 
 ---
 
## Usage


### Add/Subtract Karma

This is a simple Discord karma app. Simply put, to *add* karma, append any keyword (user ID, name, or anything, even emotes) with a `++` 

To *subtract*, append the keyword with `--` 

Only the last two `++` or `--` count, so doing `keyword+++++++++` or `@user--------+++----` will result in `keyword` gaining one regular karma and `@user` losing one in this example. That is, the messages are cleaned before counting.

So, *assuming the prefix is >k here*, one can simply type:

`user123++` (will add (+1) Karma to user123) or `user123--` (will subtract (-1) Karma to user123) and the bot will display the following in a random color embed:

> [KARMA] **user123** has **X** Karma! To lookup later use **>k** and type **>k user123**  

(where X can be positive or negative Karma count)

- Searches ARE case sensitive, so giving karma to a keyword "test" is different from "Test"** (to change this, see comment in `karma.js` and change `.trim();` to `.trim().toLowerCase();`)

- These values are stored in the specified folder (default "karmafiles") as binary files containing the current int karma count (positive or negative).

*You can also add karma for an emoticon, :emoticonname: ++/-- if you wish; this will work as well and is stored correctly. Can be useful for specific emoticons (such as custom ones in your server)*

**NOTE: Because of this, if you add a user's karma with @username vs. username, it will be two different keywords to the karma counter.** That is intended. It is not limited for users. Karma can be awarded to anyone, or any keyword, or even an emoji :-)

### Lookup Karma

You can lookup karma by simply typing the following:

**{PREFIX} {KEYWORD}** where *PREFIX* is setup in `config.json` for example, `>k` will set the prefix to **>k** and keyword is simply the lookup term.

*Example: >k string* in the above example would return:

> **@user, string has X Karma!**

- Ratelimiting is enabled to prevent spam. This is done with the `Ratelimiter.js` we have. It will just prevent spamming Karma. We allow users to give Karma to themselves, we are agnostic here! If you did something and think you should reward yourself for it, well...who are we to judge, I guess? Anyway, nothing exciting about 'abusing' it and the Ratelimiter just works to prevent spam by making it longer and longer before a user can add new Karma. (i.e. similar to the ratelimits on Discord's servers by design)

## Support

You can reach me `vlexar#5320` on my Discord server: https://discord.io/joinec or open a GitHub issue: https://github.com/shikhir-arora/karma-simple/issues
