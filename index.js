// Extract the required classes from the discord.js module
const { Client, RichEmbed, Guild } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();

const express = require('express');

var app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} (${client.user.id}) on ${client.guilds.size}`);
  client.user.setGame(`${process.env.PREFIX}aide`);
});

client.on('message', message => {
  prefix = process.env.PREFIX;

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
  if(cmd === "project" || cmd === "newproject" || cmd === "projet") {    
    const guild = message.guild;
    if(guild.available) {
      console.log(guild.id);
    } else {
      console.log(`Guild unavailable`);
    }    
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN);