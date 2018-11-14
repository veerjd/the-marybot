const botconfig = require('./botconfig.json')
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NDkyNTU0NTI2NTU4MjU3MTc1.Ds02Xg.E2KPwa2cMerbybTdRVICQcGQhmc');