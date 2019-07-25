exports.findChanneByStr = function (server, channelStr) {
    return server.channels.find(x => x.name.toLowerCase() === channelStr);
}

exports.archiveCategory = function (client) {
    const archiveChannel = client.channels.find(x => x.name.toLowerCase() === "archive");
    return archiveChannel;
}

exports.projetCategory = function (client) {
    const archiveChannel = client.channels.find(x => x.name.toLowerCase() === "projets");
    console.log(`archiveChannel:`, archiveChannel)
    return archiveChannel;
}