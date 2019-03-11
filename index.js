// Extract the required classes from the discord.js module
const { Client, RichEmbed } = require('discord.js');
//const botconfig = require('./botconfig.json');
 
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

  const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const categProjets = `544343900748513280`;
  const categArchive = `542019038180540436`;
  const archiveChannel = `542019112839413790`;
  const roleStaff = `535849987448242192`;

  console.log(`cmd: ${cmd}`);
  console.log("args: ", args);

  //HELP
  if (cmd == "help") {
    var embedhelpadmin = new RichEmbed()
      .setAuthor("Commandes pour Admins.")
      .addField("!projet", "Crée un nouveau projet en donnant les permissions demandées.")
      .addField("!archive", "Archiver un channel.")
      .setColor(0xF5F5DC)
      .setFooter("Ⓒ 2019 Example Bot.", client.user.displayAvatarURL);
    if(message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embedhelpadmin);
  }

  //CREATE CHANNEL
  //!projet projet-orange julien jd ariannemoffatt
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
          var newMember = guild.members.find(u => u.nickname.toLowerCase().includes(args[i]));
          if(newMember) {
            permsArray.push(newMember);
          }
        }

        console.log(`permsArray: ${permsArray.length}`);
//Add permissions
        for(i=0;permsArray[i];i=i+1) {
          newChannel.overwritePermissions(permsArray[i], {
            VIEW_CHANNEL: true
          });
        }
      })//end of promise
      .catch(console.error);
  }

//CMD = ARCHIVE
  if(cmd === "archive") {
    message.channel.setParent(categArchive);
    message.guild.channels.get(archiveChannel).send(`${message.channel} a été archivé le **${message.createdAt}**.`);
    message.delete();
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN || botconfig.TOKEN);