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
  if(cmd === "project" || cmd === "newproject" || cmd === "") {
    let allMentions = message.mentions.users.array();

    console.log(allMentions);
    /*
    for(i=0;allMentions[i];i++) {
      
    };
    guild.createChannel("", "text", [{
      id: guild.id,
      deny: ['MANAGE_MESSAGES'],
      allow: ['SEND_MESSAGES']
    }])
    .then(channel => {
      let category = guild.channels.find(c => c.name == "Text Channels" && c.type == "category");
      let channel = guild.channels.find(c => c.name == "general" && c.type == "text");
  
      if (!category) throw new Error("Category channel does not exist");
      channel.setParent(category.id);
    }).catch(console.error);*/
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN);