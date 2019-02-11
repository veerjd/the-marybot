const botconfig = require('./botconfig.json')
const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');

var app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;

  let prefix = process.env.PREFIX;
  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  console.log("prefix:", prefix);
  console.log("cmd:", cmd);
  console.log("args:", args);

  if(cmd === `${prefix}hello`) {
    return msg.channel.send("Hello!");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN);