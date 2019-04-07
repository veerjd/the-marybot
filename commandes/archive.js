//const { MessageCollector, Client, RichEmbed } = require('discord.js');

const categArchive = `542019038180540436`;
const archiveChannel = `542019112839413790`;

exports.name = "archive";

exports.description = "archive";

exports.usage = "archive";

exports.cmd = function(message) {
    message.channel.setParent(categArchive);
    message.guild.channels.get(archiveChannel).send(`${message.channel} a été archivé le **${message.createdAt}**.`);
    message.delete();
}