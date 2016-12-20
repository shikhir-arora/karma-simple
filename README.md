# karma-simple

Simple Karma system for Discord in NodeJS

# Requirements

NodeJS/npm.

The pacakage uses Discord's JS wrappers and Discord's Erlang fast pack library, as well as the node-localstorage for simple storage. 

# Install

Create an OAuth2 bot using Discord's API. For this application, you will need the token. Visit https://discordapp.com/developers/applications/me/create to create an application. Name the application and save it - choose "Bot" afterwords and generate the token, client ID, etc. You will need to paste the client ID generated into the following URL: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=0 

Replace **CLIENT_ID with the generated client ID.**

Visit this link to add the bot to your server.

Next, **edit the index.js file to reflect the proper token at the top.** The default folder for the localstorage that will store the karma as individial files as the string name with the integer karma (negative/positive) stored is "cache", which can be changed in index.js. Once done - save this file.

# Run

To run, simply **npm install** in the directory to install the node dependencies and wrappers.

To start: **node index.js** 

It will start logging to the console and inform when connected. Updates will be shown as [KARMA] string {sign} where {sign} is plus or negative.

(Example: [KARMA] user1 plus

[KARMA] user2 minus ...)

# Usage - Add/Subtract Karma

This is a **very** simple Discord karma app. It does not currently differentiate between very much; all it is doing is looking for the "++" or "--" at the end of *any* keyword. So, one can simply type:

user123++ and the bot will display *user123 has X karma!* where X can be positive or negative.

As it is a very simple bot, you can type in **any** string and it is **not** case sensitive - everything is displayed/recorded in lowercase, despite any string entered:

string++ or string-- (STRING++ or STRING-- are stored as string++ or string--)

These values are stored in the specified folder (default "cache") as binary files containing the current int karma count (positive or negative).

*You can also add karma for an emoticon, :emoticonname: ++/-- if you wish; this will work as well and is stored correctly. Can be useful for specific emoticons (such as custom ones in your server)*

**NOTE: Because of this, if you add a user's karma with @username vs. username, it will be two different keywords to the karma counter.**


# Usage - Lookup Karma

You can lookup karma by simply typing the following:

**{PREFIX}{KEYWORD}** where *PREFIX* is setup in const PREFIX=''; in index.js -- for example, const PREFIX='~'; will set the prefix to **~** and keyword is simply the lookup term.

*Example: ~string* in the above example would return:

**@user, string has X karma!**

# Notes

Also, as it is very simple right now, it is only removing the "++" or "--", so if one types in:

string+++ or string---, it will output the karma for the string+ or string- : that is

*string+ has X karma!* or *string- has X karma!* 

If you had a longer string with a lot of "+" or "-", the string saved in the storage will be that string with the last two "++" or "--" removed.

# TODO

Ratelimiter added Dec 20, 2016

Karma lookup added Dec 20, 2016

