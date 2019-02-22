const { client, RichEmbed } = require('discord.js');
const client = new Discord.Client();
const express = require('express');

var app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  prefix = process.env.PREFIX;

  if (!message.content.startsWith(prefix) || message.content === prefix || message.author.bot || !message.guild) return;

  const args = message.content.slice(prefix.length).split(' ');
  const cmd = args.shift().toLowerCase();

  console.log("cmd: ", cmd);
  console.log("args: ", args);

//HELLO
  if(cmd === "hello") {
    message.channel.send("world!")
      .catch(console.error);
  }
  //EMBED
  // If the message is "how to embed"
  if (cmd === 'embed') { 
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('A slick little embed')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!');
    // Send the embed to the same channel as the message
    message.channel.send(embed);
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
//    HERE IS THE PROBLEM, 'guilds' is not defined.
      //      let category = message.guild.channels.find(c => c.name == "projets" && c.type == "category");
  
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