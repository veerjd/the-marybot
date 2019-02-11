const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');

var app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  prefix = process.env.PREFIX;

  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot || msg.channel.type === "dm") return;

  const args = msg.content.slice(prefix.length).split(' ');
  const cmd = args.shift().toLowerCase();

  console.log("cmd: ", cmd);
  console.log("args: ", args);

//HELLO
  if(cmd === "hello") {
    console.log("entered 'hello'");
    msg.reply("world!");
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