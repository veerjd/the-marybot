const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');

var app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!message.content.startsWith(prefix) || message.author.bot || msg.channel.type === "dm") return;

  const args = message.content.slice(prefix.length).split(' ');
  const cmd = args.shift().toLowerCase();

//HELLO
  if(cmd === "hello") {
    console.log("entered 'hello'");
    message.reply("world!");
  }
//CREATE CHANNEL
  if(cmd === "project" || cmd === "newproject" || cmd === "") {
    console.log("entered 'project'");
  };

});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN);