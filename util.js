exports.findChanneByStr = function (client, channelStr) {
    return client.channels.find(x => x.name.toLowerCase() === channelStr);
}

exports.archiveCategory = function (client) {
    const archiveChannel = client.channels.find(x => x.name.toLowerCase() === "log-archive");
    return archiveChannel.parent;
}