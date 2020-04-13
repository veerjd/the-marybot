module.exports = {
  name: 'projet',
  description: 'créer un channel dans la catégorie projet en incluant les personnes décrites.',
  aliases: ['project'],
  usage(prefix) {
    return `\`${prefix}projet brochure alexis julien gwen\``
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