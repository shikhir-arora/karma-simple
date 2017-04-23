### Please visit GitBooks: https://shikhirarora.gitbooks.io/karma-simple/content/

----

# karma-simple

Simple Karma system for Discord in NodeJS

# Requirements

NodeJS/npm.

The pacakage uses Discord's JS wrappers and Discord's Erlang fast pack library, as well as the node-localstorage for simple storage. 

# Install

Create an OAuth2 bot using Discord's API. For this application, you will need the token. Visit https://discordapp.com/developers/applications/me/create to create an application. Name the application and save it - choose "Bot" afterwords and generate the token, client ID, etc. You will need to paste the client ID generated into the following URL: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=0 

Replace **CLIENT_ID with the generated client ID.**

Visit this link to add the bot to your server.

Next, **edit the karma.js file to reflect the proper token at the top. Please ensure to keep the token private. The token is NOT the same as the CLIENT_ID, which is used in the URL in the prior step to invite/add the bot to your server. Edit the line at the top with the token from the prior step:**

`const TOKEN=''; // edit with proper token`

The default folder for the localstorage that will store the karma as individual files as the string name with the simple integer karma (negative/positive int) stored is "karmafiles" (which can be changed in karma.js if needed).

**Add the prefix (some character) for Karma lookups (see Usage - Karma Lookups below) under:** 

`const PREFIX=''; // edit with desired prefix, such as >k`

Once done adding the token & prefix, save karma.js.

# Run

To run, simply **npm install** in the directory to install the node dependencies and wrappers.

To start: **node karma.js** 

It will start logging to the console and inform when connected. Updates will be shown as [KARMA] string {sign} where {sign} is plus or negative.

(Example: [KARMA] user1 plus

[KARMA] user2 minus ...)

**IMPORTANT NOTE: To keep this bot running in the console as a background task so it does not stop when the console process terminates/times out, use a process manager such as** [pm2](https://github.com/Unitech/pm2) **(recommended) or a terminal multiplexer like** [tmux](https://tmux.github.io)

The bot will come online if everything was done correctly.

# Usage - Add/Subtract Karma

This is a **very** simple Discord karma app. It does not currently differentiate between very much; all it is doing is looking for the "++" or "--" at the end of *any* keyword. 

**Adding a single Karma point is done with a "++" and removing a single Karma point is done with "--"**

So, *assuming the prefix is >k here*, one can simply type:

`user123++` (will add (+1) Karma to user123) or `user123--` (will subtract (-1) Karma to user123) and the bot will display:

> [KARMA] **user123** has **X** Karma! To lookup later use **>k** and type **>k user123**  

(where X can be positive or negative Karma count)

**Searches ARE case sensitive, so giving karma to a keyword "test" is different from "Test"** (to change this, see comment in `karma.js` and change `.trim();` to `.trim().toLowerCase();`)


These values are stored in the specified folder (default "karmafiles") as binary files containing the current int karma count (positive or negative).

*You can also add karma for an emoticon, :emoticonname: ++/-- if you wish; this will work as well and is stored correctly. Can be useful for specific emoticons (such as custom ones in your server)*

**NOTE: Because of this, if you add a user's karma with @username vs. username, it will be two different keywords to the karma counter.**


# Usage - Lookup Karma

You can lookup karma by simply typing the following:

**{PREFIX} {KEYWORD}** where *PREFIX* is setup in `const PREFIX='';` in karma.js -- for example, `const PREFIX='>k';` will set the prefix to **>k** and keyword is simply the lookup term.

*Example: >k string* in the above example would return:

> **@user, string has X Karma!**

# Notes

Also, as it is very simple right now, it is only removing the "++" or "--", so if one types in:

string+++ or string---, it will output the karma for the string+ or string- : that is

> *string+ has X karma!* or *string- has X karma!* 

If you had a longer string with a lot of "+" or "-", the string saved in the storage will be that string with the last two "++" or "--" removed.

# TODO

~~Universal Ratelimiter~~ [added 12/20/2016] 

~~Karma lookup~~[added 12/20/2016] 

