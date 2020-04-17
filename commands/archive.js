module.exports = {
  name: 'archive',
  description: 'déplacer le channel dans la catégorie `archive`',
  aliases: [],
  usage(prefix) {
    return `\`${prefix}archive [#CHANNEL]\``
  },
  // You can have as many categories as you want, just make sure to update the help.js file with them
  category: 'Staff',
  // Required perms of the author of the message
  permsAllowed: ['MANAGE_ROLES', 'VIEW_AUDIT_LOG'],
  // User that can do the command regardless of .permsAllowed
  usersAllowed: ['217385992837922819'],
  execute: async function(message) {
    let channel
    if(message.mentions.channels.first())
      channel = message.mentions.channels.first()
    else
      channel = message.channel

    const channels = message.guild.channels.cache
    const archiveLog = channels.find(x => x.name.toLowerCase() === 'log-archive');
    const archiveCategory = channels.find(x => x.name.toLowerCase() === 'archive');

    if(archiveCategory === channel.parent)
      throw 'Le channel est déjà archivé!'

    channel.setParent(archiveCategory)
      .then(movedChannel => {
        movedChannel.lockPermissions()
          .then(() => console.log('Permissions synchronisées!')).catch(console.error)
        archiveLog.send(`${channel} a été archivé le **${message.createdAt}** par ${message.author}.`)
          .then().catch(console.error)
        channel.send(`Ce channel a été archivé le **${message.createdAt}** par ${message.author}.`)
          .then().catch(console.error)
      })
      .catch(console.error);
  }
}