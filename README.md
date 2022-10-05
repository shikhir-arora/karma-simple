
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Discord](https://discordapp.com/api/guilds/249664293656592384/embed.png)](https://discord.gg/dAtsJqE)
[![Discord Bots](https://discordbots.org/api/widget/servers/255110583072980992.svg?noavatar=true)](https://discordbots.org/bot/255110583072980992)
[![Downloads](https://img.shields.io/github/downloads/shikhir-arora/karma-simple/total.svg)](https://github.com/shikhir-arora/karma-simple/releases/tag/2.0.1)
[![Discord Bots](https://discordbots.org/api/widget/status/255110583072980992.svg)](https://discordbots.org/bot/255110583072980992)

[![Known Vulnerabilities](https://snyk.io/test/github/shikhir-arora/karma-simple/badge.svg?targetFile=package.json)](https://snyk.io/test/github/shikhir-arora/karma-simple?targetFile=package.json)
[![Build Status](https://travis-ci.com/shikhir-arora/karma-simple.svg?branch=master)](https://travis-ci.com/shikhir-arora/karma-simple)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1091/badge)](https://bestpractices.coreinfrastructure.org/projects/1091)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/shikhir-arora/karma-simple.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/shikhir-arora/karma-simple/context:javascript)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/shikhir-arora/karma-simple/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/shikhir-arora/karma-simple/?branch=master)
[![npm-build](https://img.shields.io/npm/v/karma-simple.svg)](https://npmjs.org/package/karma-simple)
[![StandardJS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/41ca5d457fcb42fe9a3d77e511a9acc0)](https://app.codacy.com/app/shikhir-arora/karma-simple?utm_source=github.com&utm_medium=referral&utm_content=shikhir-arora/karma-simple&utm_campaign=badger)

[![GitHub issues](https://img.shields.io/github/issues/shikhir-arora/karma-simple.svg?style=flat-square)](https://github.com/shikhir-arora/karma-simple/issues)
[![GitHub license](https://img.shields.io/github/license/shikhir-arora/karma-simple.svg?style=flat-square)](https://raw.githubusercontent.com/shikhir-arora/karma-simple/master/LICENSE)





# karma-simple

> A simple, lightweight and functional [Discord](https://discordapp.com/) utility/Bot used for awarding positive or negative "Karma" to any user/keyword.

> Public Bot Direct Invite: https://bot.discord.io/karmabot  **[scroll to the bottom of this page for support!]** We'd appreciate if you could also give us a vote on [DiscordBots](https://discordbots.org/bot/255110583072980992) :)


## Screenshot In Action
![karma-simple](https://i.imgur.com/b7aDUOK.jpg)

GIF: https://i.imgur.com/hqehZjR.gif

**We make sure to keep up-to-date. Although this is a small bot, we still run the same CI and build tests (as shown above). Our buildfile test includes our autoinstaller script(s).**

## Installation

The bot is built for Discord using [discord.js v12.0.0-dev](https://github.com/hydrabolt/discord.js) and - for ease of access, we are including an basic install script for macOS/Linux and Windows, but the "manual" install workflow is still the recommended way.


## Requirements:

> Node version v12+ (to check your node version, you can type  `node --version` - to update Node, you can use [nvm](http://nvm.sh) and `nvm install latest` or your package manager (like `apt-get` or `yum`) to update. Because we like to stay up-to-date with things, Node v12 is required with the latest always being ideal in production. The project **will throw an error if Node is below v12**

> Git is also required.

> ~~MongoDB or any Enmap-capable v3.x.x database is required; more on this below. This is a requirement from v2.0.1 as we switched to Enmap with MongoDB as the provider. **Feel free to bug me about this if you need help:** `.vlexar#0001` on Discord.~~ **As of [version 3.0.0](https://github.com/shikhir-arora/karma-simple/releases/tag/3.0.0), karma-simple uses the latest Enmap version, which ships with `sqlite` as a required database provider. Therefore, you do not need to configure an external provider.**

> `npm` or `yarn` (the lockfiles are kept in-sync on the git repo on every push) manages the packages we need, which are found in `package.json` and are always kept up-to-date. **This project uses discord.js v12.0.0-dev: [discord.js master branch](https://github.com/discordjs/discord.js/blob/master/package.json)** -- and we require **>=Node v12.x** -- we also safely assume you know how to install Node on your system. 👍

 - The above which are handled by `npm/yarn` and/or with our [macOS/Linux installer script](https://raw.githubusercontent.com/shikhir-arora/karma-simple/master/installer.sh) or [Windows installer script](https://raw.githubusercontent.com/shikhir-arora/karma-simple/master/installer.bat).

 - ~~The script **doesn't** install MongoDB or any other database for you; but I'll hopefully get to writing a documentation about that/doing it for free on Atlas shortly. There's some information below.~~ **As mentioned, as of [version 3.0.0](https://github.com/shikhir-arora/karma-simple/releases/tag/3.0.0), no database provider is required, as the latest Enmap uses `sqlite`bundled in. You still have to configure a few basic parameters in your `config.json`, however (`token`, `prefix`, `adminprefix`, `ownerID`) explained below.**

---

## Install

### macOS/Linux: Installer Script (though the "manual" way is still recommended below)

 ```wget -qO- https://raw.githubusercontent.com/shikhir-arora/karma-simple/master/installer.sh | bash```

> **You may need to run this with sudo depending on your permissions!** (it is likely depending on how your configuration and setups are) In that case, you should add `sudo` in front of the `wget` **and** before the `bash` otherwise the sudo action will only be applied to the download of the installer.sh file itself.

> We will have *super seamless* update scripts - in-fact if you use the installer all one needs to do to update is `git pull` and we will have a way for the Botowner to do that in Discord shortly!

~~> You will need a MongoDB URL setup. This in for Enmap. More on this below.~~ *No longer needed as of 3.0.0 - see below for more*

### Windows: Installer

- Download `installer.bat` [link here](https://github.com/shikhir-arora/karma-simple/releases/download/3.0.0/installer.bat) and **run/open with Administrator access**

- This should install the Node modules and KarmaBot files.

- **Do not use this to update the bot, which can be done with a simple git pull as it will delete your old Karma files! Only use it for the initial/fresh install. (the install scripts are meant for ease of use; ideally you should use the `git` workflow and clone the repo, etc. -- instructions are below)**

- Git and Node are required; the script will error but there will be a link provided if Node/Git are not detected.

~~- You will need a MongoDB URL setup. This in for Enmap. More on this below.~~ *No longer needed as of 3.0.0*


While we are on the [npm](https://npmjs.org/package/karma-simple) directory and the bot can indeed can be installed via. npm in a single-pass: `npm install karma-simple` - which manages everything, you must be aware of where it installs, as *all* users need to configure `config.json` which links in the project. Our install-script makes sure this folder structure is kept intact by installing to a temporary directory and deleting it after. **Also, I can't guarantee npm will always be up-to-date as I don't push to npm unless there's some major release.** It was put there a loooong time ago. 🙃

The manual instructions below are quite straightforward.

Standard manual instructions below:

---

- Manual instruction **(recommended way)**:

- Clone the repo -

```sh
git clone --recursive --depth 1 https://github.com/shikhir-arora/karma-simple.git
```

- Change directories to `karma-simple` and once there, run `npm install` (or `yarn install`) to install the packages needed. If using yarn, we want to tell it to build from source (for `node-gyp` reasons). The _entire_ workflow will look like this (and you may need to `sudo` these commands if you are getting permission errors, though you shouldn't be using the root user anyway...I digress):

```sh
git clone --recursive --depth 1 https://github.com/shikhir-arora/karma-simple.git
cd karma-simple && mkdir karmaStore # we make this directory for Enmap's database (sqlite) contents'.
export npm_config_build_from_source=true
npm install # or yarn install, if using yarn
```

> **Continue below as normal to edit `config.json`**

### ~~Enmap w/ MongoDB Configuration~~

~~As of v2.0.0, KarmaBot no longer uses `node-localStorage` to store Karma. Instead, we switched to [Enmap](https://www.npmjs.com/package/enmap) with MongoDB as a provider [enmap-mongo](https://www.npmjs.com/package/enmap-mongo). You can use Mongo or any of the Enmap-capable 3.x providers. It's just a few lines of switching code; please contact me if you need help with this. The change allows us to add much more capability when wanted/needed, is faster and cleaner and uses a persistent enhanced-map data structure.~~

~~You will need to either setup MongoDB (or use another database supported by Enmap 3.x persistence) or simply use a service like [Atlas](https://www.mongodb.com/cloud/atlas) which provides a basic, free tier that works fine for this project if you're not hosting thousands of servers. This doesn't need much resources at all, so almost any installation will work.~~

~~I'm not going to post a detailed guide on databases or MongoDB installation as they exist out there and getting it setup isn't too difficult. Once you have set up MongoDB, you'll simply need to edit the following in `karma.js`:~~

```js
// ENMAP PROVIDERS ARE DISCONTINUED IN KARMA-SIMPLE v3.0.0 -- NOT NEEDED AS OF BOT VERSION 3.0.0.

client.karmaStore = new Enmap({ provider: new EnmapMongo({
  name: `karmaStore`,
  dbName: `enmap`,
  url: 'mongodb+srv://karma:lexmark1@cluster0-g085d.gcp.mongodb.net/enmap'
})
})
```

~~This can be found at the top of the `karma.js` file. **Don't change anything but the URL!** MongoDB URL formats are usually in the form: `mongodb://user:password@IP:PORT/name` and we'll call ours `enmap` -- in our example (no, it's not a working database), we're using a Google Compute Cluster with Atlas, and that uses the newer drivers and supports DNS seedlisting. So, our URL looks a little different. In either case, you should simply edit the URL. Save this.~~

~~That's the only switch on the user end for Enmap/Mongo! Everything else is handled in the code.~~

~~**Please don't hesitate to contact me (`.vlexar#0001`) on Discord if you need assistance with Mongo.**~~


> **The above ^ is no longer needed as of [version 3.0.0](https://github.com/shikhir-arora/karma-simple/releases/tag/3.0.0), karma-simple uses the latest Enmap version, which ships with `sqlite` as a required database provider. Therefore, you do not need to configure an external provider.**

## Configuration (for all users!)

You **must** edit the `config.json` file.

- **Insert your bot token and change the prefix if you wish to.**

**Save the file as `config.json` when complete. This can be before or after the installer script.**

### Admin Configuration and Eval Command (for the owner of the bot!)

**Administrators should pay attention to the following parameters in the `config.json` file:**

- **ownerID**: The Discord ID of the owner. Not the user or username, but the full Snowflake ID. To get this, enable Developer Mode and right click your user. "Copy ID" will output your user ID.

- **adminprefix**: The prefix for administrators to use the Eval command. To disable this, ignore the 'ownerID' and leave it as is. This will disable the eval command.

- **The eval command is for advanced users only. It allows one to run admin-tasks by evaluating JavaScript from within Discord. I won't go into it here, because if one must ask about it, they shouldn't mess with the eval command. If you know what it is, then this should be self-sufficient.**

- There is a seperate command prefix for Eval for the botowner. For example, the default prefix is `>k` and the default prefix for admin-eval is `>>k`. **To evaluate code, you must type the prefix with the keyword** 'eval' - so `>>k` as the adminprefix means `>>keval [stuff]` is how one would use the eval command.

- Remember, the ownerID: field must be set correctly and you must use the proper adminprefix. The bot will only respond to the ownerID with the correct adminprefix.

- Will post to Gist for overflows (errors/outputs > 2000 characters) -- token is sanitized (redacted) from Eval outputs. You'll need to setup `node-gist` as described here to allow GitHub to post Gists as they aren't open anymore and need a token or OAuth2 grant. See - https://gitlab.com/shikhir-arora/node-gist/blob/master/README.md

Again, contact me on Discord if you need help with this!

### Admin Console (Exec) Command

- Just like the Eval command, *this should be used with caution and care; if you need to "ask" about this, you probably shouldn't use this command - misuse can expose your root library and more (especially if you are using the root user to run this bot).*

- It allows you to access your console from within Discord. It will post to Gist if it cannot fit the 2000 character limit. Eval will also do the same. See the above eval info about setting the Gist stuff up, contact me if you need help - you get the drill 👌

- I won't say much about this as mentioned above; if you need to ask then it's probably better/safer to avoid using the Exec/Eval features! :-)

- Accessed through the same means as Eval (above); with the adminprefix, ownerID together -- so you use the same logic as above to access the Exec command. The only difference is "exec" vs. "eval"; both use the same pre-checks.


### Note To Selfhosters (API Tokens)

> This can be safely ignored by selfhosters.

- You'll notice some parts of the code which have to do with pushing the public bot stats [see here](https://discordbots.org/beta/bot/255110583072980992) [and here](https://bots.discord.pw/bots/255110583072980992) - Namely the 'guildCreate' and 'guildDelete' as well as the regular 'ready' state will post using the two functions `discordBotsOrg()` and ` discordBotsPw()`


- If you have a token for these websites or wish to get one, you can - the spots where the Auth token is needed is left blank here ('') -- but please do not use the same username/avatar to avoid confusion!

- The lack of a token in the code for the API portion can be safely ignored. It will simply fail to post the stats and catch that (or you can delete the `postDiscordStats()` function from the code, and remove all the references to it as well under the `client.` events that call it).

*nit: ^ it's actually not exactly like this anymore but I'm too lazy to update these docs for axios - if you care, please contact me!*

## Getting a Bot Token and Invite Link

If you have done this before, then this should be pretty straightforward. If not, go visit https://discordapp.com/developers/applications/ to create an application - click the *("New Application")* button on the top right of the page. Name the application with something you want to name it and save it - then choose "generate a Bot user" afterwords and generate the token, client ID, etc.

If you plan to give your bot to other servers, check the "Public Bot" when generating it, so others can use your invite link. Otherwise, it will only work if (you) - the person who created the bot token - invites the bot.

	Save your client ID and token. They are different things! :-)

There are better guides out there, but most who would use this kind of tool likely are fine with getting this part finished. But, [here is a good guide from jagrosh - this page applies for getting a token and client ID](https://github.com/jagrosh/MusicBot/wiki/Getting-a-Bot-Token)

Once you do get the client ID and token, for the invite link, if you wish I have populated a pre-made form: https://discordapi.com/permissions.html#201673792 in which you can enter your bot client ID in and it will generate the proper invite link with permissions and the bot will be assigned a role that is the name of your Bot application upon joining the server (so if you call the bot KarmaBot, it will get a role called KarmaBot with the right permissions - if that link is used)


## Run

**Ensure you are in the `karma-simple` directory, have installed the packages with `npm`, `yarn`, or the installer script, and have configured `config.json` with the proper values for your instance.**

- To run, type ```node karma.js``` (may need elevated permissions) **(if this is an issue, run with `sudo` or `sudo -H` -- but you should not use the root user as best practice)**

- Please see the section below though -

- To keep this bot running in the console as a background task so it does not stop when the console process terminates/times out, use a process manager such as [pm2](https://github.com/Unitech/pm2) **(highly recommended)** or a terminal multiplexer like [tmux](https://tmux.github.io)


### pm2 - Strongly Recommended

> pm2 can be found here: https://github.com/Unitech/pm2

You can read their quick install instructions, it takes just a minute. Please make sure you run `pm2 update` if you have pm2 but haven't updated in a while. It is seamless.

Once installed, instead of using `node karma.js` we go `cd` into our same `karma-simple` directory and can run:

`pm2 start karma.js --name "somename"` where you can edit somename to call your application.

> **RUNNING AS SYSTEMD** Once we did all this with pm2, we can have it so it will restart on things like server reboots. For Linux, `systemd` manages the startup tasks. Once we started the bot, we can simply run `pm2 startup` which will take your pm2 projects and run them in the systemd for autostartup on harder reboots.

  ```bash
  pm2 unstartup [platform]                    disable and clear auto startup
  pm2 startup [platform]                      setup script for pm2 at boot

  where [platform]=systemd,upstart,launchd,rcd   # one of these, with most Linux it is just systemd
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

- Searches ARE case sensitive, so giving karma to a keyword "test" is different from "Test" (to change this, see comment in `karma.js` and change `.trim();` to `.trim().toLowerCase();`)

*You can also add karma for an emoticon, :emoticonname: ++/-- if you wish; this will work as well and is stored correctly. Can be useful for specific emoticons (such as custom ones in your server)*

**NOTE: Because of this, if you add a user's karma with @username vs. username, it will be two different keywords to the karma counter.** That is intended. It is not limited for users. Karma can be awarded to anyone, or any keyword, or even an emoji :-)

### Lookup Karma

You can lookup karma by simply typing the following:

**{PREFIX} {KEYWORD}** where *PREFIX* is setup in `config.json` for example, `>k` will set the prefix to **>k** and keyword is simply the lookup term.

*Example: >k string* in the above example would return:

> **@user, string has X Karma!**

### Ratelimiting

- Ratelimiting is enabled to prevent spam. This is done with the `Ratelimiter.js` we have. It will just prevent spamming Karma. We allow users to give Karma to themselves, we are agnostic here! If you did something and think you should reward yourself for it, well...who are we to judge, I guess? Anyway, nothing exciting about 'abusing' it and the Ratelimiter just works to prevent spam by making it longer and longer before a user can add new Karma. (i.e. similar to the ratelimits on Discord's servers by design) -- this is not 'visible' to the user, but of course the simple code is in `Ratelimiter.js` - **tl;dr** -> if you spam a lot to KarmaBot, your user is added to a countdown which removes one entry every 3 seconds. If you accumulate more than two entries - which means ~6 seconds - the bot won't respond until the timer removes enough so you are below two [remember, it removes one entry every three seconds by default] This only affects KarmaBot, and it won't send any message or notification - rather just not respond.

### Blacklist / Misc.

- By default, *anyone* can use Karma. This is how the vast majority of users end up using it, and it is also out of simplicity. It was also the idea to enable cross-guild Karma with a seamless user experience. As of v1.0.5, however, there is a **blacklist** feature which is per-guild - this requires a user with `Manage Role` permissions (at the minimum) to create a role called **NoKarma** (case-sensitive) and assign it to any user(s) - this will block the user from adding/subtracting Karma. They will get a message reply back and the bot will react with a red-circle icon to indiciate that they should talk to a mod in the server.
They **will** be able to lookup Karma, so you can make, for example, an admin-only points system where mods have access to give Karma but users can only look up Karma. Makes a lot more sense this way and has been that way on the public bot for a while.

- **We do have a `stats` command**, which can be accessed by typing `@KarmaBot stats` - all of this is on the help menu as well (in-guild, `@KarmaBot help`) Note that the bot does **not** accept user-commands through DM, except for `stats` :-) This shows some real-time stats about the server/bot.

- If you ping the bot `@KarmaBot` with nothing else it'll respond with some how-to, since users often do that. (:



# Support

You can reach me `vlexar#0001` (User ID: `243902693666455553`) pretty easily on my Discord server: [invite](https://discord.gg/dAtsJqE) or feel free to always open a GitHub issue: https://github.com/shikhir-arora/karma-simple/issues or open an issue/pull-request if need be.

#### For users of the public KarmaBot - typing `@KarmaBot help` will bring up a quick and easy help menu with support/invite links and basic usage info, commands, blacklist info, etc.


> **Direct invite link for the public bot: [https://bot.discord.io/karmabot](https://bot.discord.io/karmabot)**

---

### License

This project is freely distributed under [The Creative Commons CC0 1.0 Universal](https://tldrlegal.com/license/creative-commons-cc0-1.0-universal) and we give full freedom to anyone who wishes to use this little bot! You are not obligated to link back to this repo in any way. This is a stronger worded, arguably more open than The Unlicense and this project has no restrictions (and no liability from myself) - this has not changed.


[![Discord Bots](https://discordbots.org/api/widget/255110583072980992.svg)](https://discordbots.org/bot/255110583072980992)
