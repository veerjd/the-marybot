// Extract the required classes from the discord.js module
const { Client, RichEmbed, Guild } = require('discord.js');
//const botconfig = require('./botconfig.json');

// Create an instance of a Discord client
const client = new Client();

const express = require('express');

var app = express();

client.on('ready', () => {
  prefix = process.env.PREFIX || botconfig.PREFIX;
  console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
  client.user.setActivity(`${prefix}aide`);
});

client.on('message', message => {
  prefix = process.env.PREFIX || botconfig.PREFIX;

  if (!message.content.startsWith(prefix) || message.content === prefix || message.author.bot || !message.guild) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  console.log(`cmd: ${cmd}`);
  console.log("args: ", args);

//HELLO
  if(cmd === "hello") {
    message.channel.send("world!")
      .catch(console.error);
  }
  
  //CREATE CHANNEL
  if(cmd === "project" || cmd === "projet") {    
    const guild = message.guild;
    if(!guild.available){
      console.log(`Guild not available???`)
      return;
    } 
    
    guild.createChannel(args[0])
      .then(async newChannel => {
        await newChannel.setParent(`544343900748513280`)
        newChannel.lockPermissions()
          .then(newGuild => {
            //Alternative to .lockPermissions()
            newGuild.overwritePermissions(guild.defaultRole, {
              VIEW_CHANNEL: false
            });
            newGuild.overwritePermissions(`535849987448242192`, {
              VIEW_CHANNEL: true
            });
            mentionsArray = message.mentions.members.keyArray();
            console.log(`mentionsArray1`);
            console.log(mentionsArray);
            mentionsArray = mentionsArray.concat(message.mentions.roles.keyArray());
            console.log(`mentionsArray2`);
            console.log(mentionsArray);
            for(i=0;mentionsArray[i];i=i+1) {
              newGuild.overwritePermissions(mentionsArray[i], {
                VIEW_CHANNEL: true
              });
            }
          })
          .catch(console.error);
      })
      .catch(console.error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN || botconfig.TOKEN);