module.exports = {
  name: 'projet',
  description: 'créer un channel dans la catégorie projet en incluant les personnes décrites.',
  aliases: ['project', 'proj'],
  usage(prefix) {
    return `\`${prefix}projet brochure alexis julien gwen\``
  },
  // You can have as many categories as you want, just make sure to update the help.js file with them
  category: 'Staff',
  // Required perms of the author of the message
  permsAllowed: ['MANAGE_ROLES', 'VIEW_AUDIT_LOG'],
  // User that can do the command regardless of .permsAllowed
  usersAllowed: ['217385992837922819'],
  execute: function(message, argsStr) {
    const userArray = argsStr.split(/ +/)
    const nomProjet = userArray.shift()
    const categProjets = message.guild.channels.cache.find(x => x.name.toLowerCase() === 'projets')

    message.guild.channels.create(nomProjet, { parent: categProjets })
      .then(newChannel => {
        message.channel.send(`Le channel ${newChannel} a bien été créé!`)
        newChannel.send(`Le channel ${newChannel} a bien été créé, ${message.author}!`)
        newChannel.lockPermissions()
          .then().catch(() => message.channel.send(`Il se peut que les permissions ne soient pas bien configurées ${message.author}.`))
        newChannel.createOverwrite(message.author, {
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          MANAGE_MESSAGES: true
        })
          .then().catch(() => message.channel.send(`Il se peut que *tes* permissions ne soient pas bien configurées, ${message.author}.`))

        for(let i = 0 ; userArray[i] ; i = i + 1) {
          const newMember = message.guild.members.cache.find(u => {
            let found

            if(u.nickname) {
              found = u.nickname.toLowerCase().includes(userArray[i].toLowerCase()) || u.user.username.toLowerCase().includes(userArray[i].toLowerCase())
            } else {
              found = u.user.username.toLowerCase().includes(userArray[i].toLowerCase())
            }

            return found
          })
          if(newMember) {
            if(newMember.user === message.author)
              continue
            newChannel.createOverwrite(newMember, {
              VIEW_CHANNEL: true
            })
              .then(() => newChannel.send(`Bienvenue, ${newMember.user}, dans le projet **${nomProjet}** de **${message.author.username}**`)).catch(() => newChannel.send(`Il se peut que les permissions pour ${newMember.user} ne soient pas bien configurées, ${message.author}.`))
              .catch(() => newChannel.send(`Bienvenue, ${newMember.user}, dans le projet **${nomProjet}** de **${message.author.username}**`)).catch(() => newChannel.send(`Il se peut que ${newMember.user} n'ait pas les permissions nécessaires pour voir ton projet, ${message.author}.`))
          } else {
            message.channel.send(`Je n'ai pas trouvé d'utilisateur pour **\`${userArray[i]}\`**, ${message.author}\nIl faudra ajouter les permissions manuellement!`)
          }
        }
      }).catch(err => {throw err});
  }
}