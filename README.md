## Please visit GitBooks: https://shikhirarora.gitbooks.io/karma-simple/content/

----

# karma-simple

Simple Karma system for Discord in NodeJS. Allows for a simple, IRC-esque way of keeping track of a users *complete* life worth. That's right, you heard it here first, folks. 

# Requirements

NodeJS/npm. This is a very lightweight package that only uses localstorage and discordjs Library wrappers as mentioned: 

The pacakage uses Discord's JS wrappers and Discord's Erlang fast pack library, as well as the node-localstorage for simple storage. It is quite simple and doesn't take a lot of time to setup (5 minutes) :-)

- Node and npm
- discord-js wrappers for the API
- erlpack 
- node localstorage

which are handled by `npm install` described below :-)

# Install

Using Git for ease:

    git clone https://github.com/shikhir-arora/karma-simple.git 
    cd karma-simple 
    
This is a tiny project, so you can just:

   https://github.com/shikhir-arora/karma-simple/archive/master.zip // download this file, extract as normal.
 
 ----
 

First, create an OAuth2 bot using Discord's API. For this application, you will need the token. This will work in many servers, but it is not designed with guild tracking, so the Karma is stored for all the guilds. This works fine for the case its meant to be used for.

If you have done this before, then this should be pretty straightforward. If not, go visit https://discordapp.com/developers/applications/me/create to create an application. Name the application with something you want to name it and save it - then choose "generate a Bot user" afterwords and generate the token, client ID, etc. 

If you plan to give your bot to other servers, check the "Public Bot" when generating it, so others can use your invite link. Otherwise, it will only work if (you) - the person who created the bot token - invites the bot.

You will need to paste the **client ID** generated into the following URL: https://discordapp.com/oauth2/authorize?client_id=[CLIENT_ID]&scope=bot&permissions=0  and remove the [], so the link looks something like: `https://discordapp.com/oauth2/authorize?client_id=159148610754314241&scope=bot&permissions=0` (this is just a random link here)

Replace **CLIENT_ID with the generated client ID.** ***THIS IS NOT THE TOKEN!*** The client ID is the 18 digit number that everything in Discord is built om (all users, bots, messages, etc. have one of these in the backend). The long string that you will get is the token, which acts (is) like the password for your bot. Never give that out!

Visit that above link to add the bot to your server, putting the client ID in it above. You must have have Manage Server permissions.

#### Give the Karmabot basic send message rights like any member* That is all it needs, so do so however you wish, no need for me to explain that. Nothing fancy needed.

Next, **edit the karma.js file to reflect the proper token at the top (that long string). Please ensure to keep the token private. The token is NOT the same as the CLIENT_ID, which is used in the URL in the prior step to invite/add the bot to your server. Edit the line at the top with the token from the prior step:**

`const TOKEN=''; // edit with proper token inside the '', like const TOKEN='1230120310m1129312ab30aor01293';` (random again)


The default folder for the localstorage that will store the karma as individual files as the string name with the simple integer karma (negative/positive int) stored is "karmafiles" (which can be changed in karma.js if needed). This is not a heavy app, so we don't need anything more than this to easily store an integer for members!

**Add the prefix (some character you will use) for Karma lookups (see Usage - Karma Lookups below) under:** 

`const PREFIX=''; // edit with desired prefix, such as >k, example const PREFIX='>k'; ` 

(This will mean you do `>k <message>` in my example) with `>k` prefix to reach the bot. 

Once done adding the token & prefix, save karma.js. 

# Run

If you have not moved the files to where you wish to run and install, do:

    git clone https://github.com/shikhir-arora/karma-simple.git
    cd karma-simple 
    
Use your program of choice to then edit `karma.js` and the above.

Cloning is the easiest way to get the files, but you can just copy them to your computer, server, etc. however you want. It's not much. Just ensure you did all the above (if you clone, you should do that first, then `cd karma-simple` and edit the `karma.js` file with the token, generate your ID and invite the bot as mentioned above. 

## To run, simply type ```npm install``` in the directory to install the node dependencies and wrappers. If you are new to Node, you must remember to run ```npm install``` in the directory where karma-simple is, inside, just once to install the node dependencies. Otherwise, `node karma.js` will not work below.

### To start once done the above: ```node karma.js```


#### IMPORTANT NOTE: To keep this bot running in the console as a background task so it does not stop when the console process terminates/times out, use a process manager such as** [pm2](https://github.com/Unitech/pm2) **(recommended) or a terminal multiplexer like** [tmux](https://tmux.github.io)


----

#### It will start logging to the console and inform when connected. Updates will be shown as [KARMA] string {sign} where {sign} is plus or negative.

(Example: [KARMA] user1 plus

[KARMA] user2 minus ...)

### And bot will come online if everything was done correctly. (That is invited it to your server!)

----

# Usage - Add/Subtract Karma

This is a simple Discord karma app. It does not currently differentiate between very much; all it is doing is looking for the "++" or "--" at the end of *any* keyword. It does *only* look for that, and to avoid spam it removes any trailing `++` or `--` and only looks for two. So `karma++` and `karma+++++++++++----+++++++-+++++--++` still stores it as `karma++` every time, AKA one more karma.

**Adding a single Karma point is done with a "++" and removing a single Karma point is done with "--"**

So, *assuming the prefix is >k here*, one can simply type:

`user123++` (will add (+1) Karma to user123) or `user123--` (will subtract (-1) Karma to user123) and the bot will display:

> [KARMA] **user123** has **X** Karma! To lookup later use **>k** and type **>k user123**  

(where X can be positive or negative Karma count)

#### *Searches ARE case sensitive, so giving karma to a keyword "test" is different from "Test"** (to change this, see comment in `karma.js` and change `.trim();` to `.trim().toLowerCase();`)


These values are stored in the specified folder (default "karmafiles") as binary files containing the current int karma count (positive or negative).

*You can also add karma for an emoticon, :emoticonname: ++/-- if you wish; this will work as well and is stored correctly. Can be useful for specific emoticons (such as custom ones in your server)*

**NOTE: Because of this, if you add a user's karma with @username vs. username, it will be two different keywords to the karma counter.** That is intended. It is not limited for users. Karma can be awarded to anyone, or any keyword, or even an emoji :-)

----

### Usage - Lookup Karma

You can lookup karma by simply typing the following:

**{PREFIX} {KEYWORD}** where *PREFIX* is setup in `const PREFIX='';` in karma.js -- for example, `const PREFIX='>k';` will set the prefix to **>k** and keyword is simply the lookup term.

*Example: >k string* in the above example would return:

> **@user, string has X Karma!**

#### Ratelimiting is enabled to prevent spam. This is done with the `Ratelimiter.js` we have. It will just prevent spamming Karma. We allow users to give Karma to themselves, we are agnostic here! If you did something and think you should reward yourself for it, well...who are we to judge, I guess? Anyway, nothing exciting about 'abusing' it and the Ratelimiter just works to prevent spam by making it longer and longer before a user can add new Karma. (i.e. similar to the ratelimits on Discord's servers by design)

### Lastly - most of my comments are in `//` like that in the `karma.js` file, so that should clear anything up. 

----

# TODO

I may work on this more as time permits, adding some features. If you need anything, contact me by joining my server: https://discord.io/joinec 

My username is `.vlexar#4782` (ID: 243902693666455553)

## If you have any suggestions, always happy to take them! Measage me or post a GitHub issue.

### Remember to run something like pm2 for package management, it will make life very simple, and is a breeze to do so! Thanks for looking :-) 
