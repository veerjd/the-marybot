const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');

var app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  prefix = process.env.PREFIX;

  if (!message.content.startsWith(process.env.PREFIX) || message.content === '?' || message.author.bot || !message.guild) return;

  const args = message.content.slice(prefix.length).split(' ');
  const cmd = args.shift().toLowerCase();

  console.log("cmd: ", cmd);
  console.log("args: ", args);

//HELLO
  if(cmd === "hello") {
    message.channel.send("world!")
      .catch(console.error);
  }
//CREATE CHANNEL
  if(cmd === "project" || cmd === "newproject" || cmd === "projet") {    
    let permArray = [];
    let mentionsArray = Object.keys(message.mentions.users);
    let len = mentionsArray.length;
    for (var i = 0; i < len; i++) {
      permArray.push({
          id: mentionsArray.results[i].label,
          allow: ['VIEW_CHANNEL']
      });
    }
    console.log('UsersMentionned:',permArray);
    guild.createChannel(args[0], "text", permArray)
    .then(newChannel => {
      let category = message.guild.channels.find(c => c.name == "projets" && c.type == "category");
  
      if (!category) throw new Error("Category channel does not exist");
      newChannel.setParent(category.id);
    }).catch(console.error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN);