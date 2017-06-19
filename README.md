
[![Discord](https://discordapp.com/api/guilds/249664293656592384/embed.png)](https://discord.io/joinec)
[![Build Status](https://travis-ci.org/shikhir-arora/karma-simple.svg?branch=master)](https://travis-ci.org/shikhir-arora/karma-simple) 
[![npm-build](http://img.shields.io/npm/v/karma-simple.svg)](https://npmjs.org/package/karma-simple)
[![Dependencies](https://david-dm.org/shikhir-arora/karma-simple.svg)](https://rawgit.com/shikhir-arora/karma-simple/master/package.json)
[![GitHub issues](https://img.shields.io/github/issues/shikhir-arora/karma-simple.svg?style=flat-square)](https://github.com/shikhir-arora/karma-simple/issues)
[![GitHub license](https://img.shields.io/badge/license-Unlicense-blue.svg?style=flat-square)](https://raw.githubusercontent.com/shikhir-arora/karma-simple/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/shikhir-arora/karma-simple.svg?style=flat-square)](https://github.com/shikhir-arora/karma-simple/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shikhir-arora/karma-simple.svg?style=flat-square)](https://github.com/shikhir-arora/karma-simple/network)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/shikhir-arora/karma-simple.svg?style=social&style=flat-square)](https://twitter.com/intent/tweet?text=Interesting!:&url=%5Bobject%20Object%5D)


# karma-simple

> A simple, lightweight and functional [Discord](https://discordapp.com/) Karma tracking bot for guild members.

## Screenshot In Action 
![karma-simple](https://i.imgur.com/b7aDUOK.jpg)

GIF: https://i.imgur.com/hqehZjR.gif

**We make sure to keep up-to-date. Although this is a small bot, we still run the same CI and build tests (as shown above). Our buildfile test includes our autoinstaller script(s). [The config we use for Travis is here](https://github.com/shikhir-arora/karma-simple/blob/master/.travis.yml) for anyone curious.**

## Installation 

The bot is built for Discord using [discord.js](https://github.com/hydrabolt/discord.js) - for ease of access, we are including an install script for macOS/Linux users.


## Requirements:

> Node.js version v8.0.0+ (to check your node version, you can type  `node --version` - to update Node, you can use [nvm](http://nvm.sh) and `nvm install latest` or your package manager (like `apt-get` or `yum`) to update. [we do test it on v7.x.x at some higher builds but we *strongly recommend* v8+ for node]


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

> **You may need to run this with sudo depending on your permissions!** (it is likely depending on how your configuration and setups are) In that case, you should add `sudo` in front of the `wget` **and** before the `bash` otherwise the sudo action will only be applied to the download of the installer.sh file itself.

> We will have *super seamless* update scripts - in-fact if you use the installer all one needs to do to update is `git pull` and we will have a way for the Botowner to do that in Discord shortly! 

### Windows

Windows instructions and a script coming very soon (will release in **v1.0.2** - continue reading below for information)

While we are on the [npm](https://npmjs.org/package/karma-simple) directory and the bot can indeed can be installed via. npm in a single-pass: `npm install karma-simple` - which manages everything, you must be aware of where it installs, as *all* users need to configure `config.json` which links in the project. Our install-script makes sure this folder structure is kept intact by installing to a temporary directory and deleting it after.

The manual instructions below are quite straightforward. I will release a Windows autoinstaller in **v1.0.2** along with a few small things shortly. Look at the [release page](https://github.com/shikhir-arora/karma-simple/releases/) as the new updates would pile there.

Standard manual instructions below:

---

- Manual instruction:

- Clone the repo -

```
git clone --recursive --depth 1 https://github.com/shikhir-arora/karma-simple.git 

```

- Change directories to `karma-simple` and once there, run `npm install` to install the packages needed.

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

You can reach me `vlexar#5320` (User ID: `243902693666455553`) pretty easily on my Discord server: https://discord.io/joinec or feel free to always open a GitHub issue: https://github.com/shikhir-arora/karma-simple/issues or pull-request a reason permits!

---

### License

This project is under [The Unlicense](https://raw.githubusercontent.com/shikhir-arora/karma-simple/master/LICENSE) and we give full freeodom to anyone who wishes to use this little bot! You are not obligated to link back to this repo in any way.


