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

  if (!message.content.startsWith(prefix) || message.content === prefix || message.author.bot || !message.guild)
    return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  console.log(`cmd: ${cmd}`);
  console.log("args: ", args);

//CREATE CHANNEL
  if(cmd === "project" || cmd === "projet") {    
    const guild = message.guild;
    const nomProjet = args.shift();
    
    guild.createChannel(nomProjet)
      .then(async newChannel => {
        await newChannel.setParent(`544343900748513280`)
        newChannel.overwritePermissions(guild.defaultRole, {
          VIEW_CHANNEL: false
        });
        newChannel.overwritePermissions(`535849987448242192`, {
          VIEW_CHANNEL: true
        });
//If all mentions
        let permsArray = message.mentions.members.keyArray();
        permsArray = permsArray.concat(message.mentions.roles.keyArray());
        console.log(`permsArray: `);
        console.log(permsArray);
//No mentions
        for(i=0;args[i] && args[i].startsWith("@");i=i+1) {
          console.log("i:");
          console.log(i);
          var newMember = guild.members.find(u => u.user.username.toLowerCase() === args[i]);
          //var newMember = guild.members.find(u => u.user.username.includes(args[i]));
          permsArray.push(newMember);
          console.log("permsArray:");
          console.log(permsArray);
        }

//Add permissions
        for(i=0;permsArray[i];i=i+1) {
          newChannel.overwritePermissions(permsArray[i], {
            VIEW_CHANNEL: true
          });
        }
      })//end of promise (then)
      .catch(console.error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN || botconfig.TOKEN);