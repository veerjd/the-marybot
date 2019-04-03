// Extract the required classes from the discord.js module
const { MessageCollector, Client, RichEmbed } = require('discord.js');
//const botconfig = require('./botconfig.json');
const commande = require('./commandes');
//const { postgres } = require('pg');
//const pg;
 
// Create an instance of a Discord client
const client = new Client();

const express = require('express');

var app = express();

client.on('ready', () => {
  prefix = process.env.PREFIX || botconfig.PREFIX;
  console.log(`Logged in as ${client.user.username}`);
  client.user.setActivity(`préfixe: ${prefix}`, { type: 'LISTENING' });
});

client.on('raw', event => {
  if(event.t === "MESSAGE_REACTION_ADD") {
//--------------------------------------
//                 ROLE
//--------------------------------------
    console.log(`event.emoji.name`);
    console.log(event.d.emoji.name);
    console.log(`event.emoji.id`);
    console.log(event.d.emoji.id);

    if(event.d.emoji.name === "reply") {
      const user = client.users.get(event.d.user_id);
      const guild = client.guilds.get(event.d.guild_id).fetchMember(user);
      const guildMember = guild.fetchMember(user);

      console.log(`GuildMember`);
      console.log(guildMember);
    }
//--------------------------------------
//                 REPLY
//--------------------------------------
    if(event.d.emoji.name === "reply") {
      const user = client.users.get(event.d.user_id);
      const channel = client.channels.get(event.d.channel_id);

      // if you're on the master/v12 branch, use `channel.messages.fetch()`
      channel.fetchMessage(event.d.message_id)
        .then(message => {
          let author;

          if (message.guild.members.get(message.author.id) === "undefined") {
            author = message.guild.members.get(message.author.id).nickname;
          } else {
            author = message.author.username;
          }

          if (!author) {
            author = message.author.username;
          }

          // custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
          // if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
          const replyEmbed = new RichEmbed()
            .setColor('#AAFFFF')
            .setAuthor(author, message.author.displayAvatarURL)
            .setTitle(`Ce message a été rappeler par **${user.username}**`)
            .addBlankField(true)
            .addField(`**`+message.content+`**`, message.url)
            .addBlankField(true)
            .setFooter('Message original envoyé')
            .setTimestamp(message.createdAt);
          channel.send(replyEmbed);
        })
        .catch(console.error);
    }
  }
});

client.on('message', message => {
  prefix = process.env.PREFIX || botconfig.PREFIX;

  if (!message.content.startsWith(prefix) || message.content === prefix || message.author.bot ||
      !message.guild || !message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send("Ils semble que tu ne puisses pas utiliser mes commandes, oups!");

    

  const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const categProjets = `544343900748513280`;
  const categArchive = `542019038180540436`;
  const archiveChannel = `542019112839413790`;
  const roleStaff = `535849987448242192`;

  console.log(`cmd: ${cmd}`);
  console.log("args: ", args);

  //HELP
  if (cmd === "aide") {
    let embedhelpadmin = commande.aide(args);
    return message.channel.send(embedhelpadmin);
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
        let nicknameArray = [];
        permsArray = permsArray.concat(message.mentions.roles.keyArray());
//No mentions
        for(i=0;args[i] && !args[i].startsWith("@");i=i+1) {
          var newMember = guild.members.find(u => u.nickname.toLowerCase().includes(args[i]));
          if(newMember) {
            permsArray.push(newMember);
            nicknameArray.push(newMember.nickname);
          }
        }

//CONFIRMATION
        collector = new MessageCollector(message.channel,m => m.author.id === message.author.id,{ time: 10000 });
        console.log(collector);
        collector.on('collect', m => {
          if (m.content.toLowerCase() == "oui") {
              m.channel.send(`Tu as dit \`oui\`!`);
              for(i=0;permsArray[i];i=i+1) {
                newChannel.overwritePermissions(permsArray[i], {
                  VIEW_CHANNEL: true
                });
              }
          } else if (m.content.toLowerCase() == "non") {
              m.channel.send(`Tu as dit \`non\`!`);
          }
        });
//Add permissions
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