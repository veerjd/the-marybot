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
  execute: async function(message, argsStr, embed) {
    
  }
};