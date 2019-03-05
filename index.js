// Extract the required classes from the discord.js module
const { Client, RichEmbed, Guild } = require('discord.js');
const botconfig = require('./botconfig.json');

// Create an instance of a Discord client
const client = new Client();

const express = require('express');

var app = express();

client.on('ready', () => {
  prefix = process.env.PREFIX || botconfig.PREFIX;
  console.log(`Logged in as ${client.user.username}`);
  client.user.setActivity(`${prefix}`, { type: 'LISTENING' });
});

client.on('message', message => {
  prefix = process.env.PREFIX || botconfig.PREFIX;

  if (!message.content.startsWith(prefix) || message.content === prefix || message.author.bot || !message.guild)
    return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const categProjets = `544343900748513280`;
  const roleStaff = `535849987448242192`;

  console.log(`cmd: ${cmd}`);
  console.log("args: ", args);

  //CREATE CHANNEL
  // ?projet projet-orange Julien JD ArianneMoffatt
  if(cmd === "project" || cmd === "projet") {    
    const guild = message.guild;
    const nomProjet = args.shift(); // projet-orange
    
    guild.createChannel(nomProjet)
      .then(async newChannel => {
        await newChannel.setParent(categProjets) // 
        newChannel.overwritePermissions(guild.defaultRole, {
          VIEW_CHANNEL: false
        });
        newChannel.overwritePermissions(roleStaff, {
          VIEW_CHANNEL: true
        });
//If all mentions
        let permsArray = message.mentions.members.keyArray();
        permsArray = permsArray.concat(message.mentions.roles.keyArray());
//No mentions
        for(i=0;args[i] && !args[i].startsWith("@");i=i+1) {
          // var newMember = guild.members.find((u) => { 
          //   return u.user.username.toLowerCase() === args[i]
          // });
          var newMember = guild.members.find(u => u.user.username.toLowerCase().includes(args[i]));
          if(newMember) {
            permsArray.push(newMember);
          }
        }

        console.log(`permsArray: `);
        console.log(permsArray);
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