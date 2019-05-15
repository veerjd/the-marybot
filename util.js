const { MessageCollector, Client, RichEmbed } = require('discord.js');

const client = new Client();

exports.findChanneByStr = function (channelStr) {
    return client.channels.find(x => x.name.toLowerCase() === channelStr);
}

exports.archiveCategory = function (channel) {
    const archiveChannel = channel.client.channels.find(x => x.name.toLowerCase() === "log-archive");
    return archiveChannel.parent;
}