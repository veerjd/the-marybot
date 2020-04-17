module.exports = {
  name: 'aide',
  description: 'donner la liste de toutes les commandes',
  aliases: ['commandes', 'commande'],
  usage(prefix) {
    return `\`${prefix}aide\``
  },
  // You can have as many categories as you want, just make sure to update the help.js file with them
  category: 'hidden', // Since 'hidden' category isn't in the categoriesMapped (see line 36), it won't display in the help command
  // Required perms of the author of the message
  permsAllowed: ['MANAGE_ROLES', 'VIEW_AUDIT_LOG'],
  usersAllowed: [''],
  execute(message, argsStr, embed) {
    const { commands } = message.client;
    const argsArray = argsStr.split(/ +/)
    const command = commands.get(argsArray[0]) || commands.find(alias => alias.aliases && alias.aliases.includes(argsArray[0]))
    let doesntHavePerms

    if(command && command.permsAllowed)
      doesntHavePerms = !(command.permsAllowed.some(x => message.member.hasPermission(x)) || command.usersAllowed.some(x => x === message.author.id))

    if(doesntHavePerms)
      throw `Tu n'as pas ce qu'il faut pour utiliser cette commande :sunglasses:\nTu peux essayer ${this.usage(process.env.PREFIX)} pour avoir la liste des commandes!`

    // If the command doesn't exist or author doesn't have perms
    if (argsStr.length != 0) {
      if (!command)
        throw `Cette commande n'existe pas.\nVa chercher de l'\`${process.env.PREFIX}aide\`!`
      else {
        embed.setTitle(`Carte d'aide pour \`${command.name}\``)
          .addField('Description:', command.description)
          .addField('Utilisation:', command.usage(process.env.PREFIX))
        if(command.aliases.length > 0)
          embed.addField((command.aliases.length === 1) ? 'Alias:' : 'Aliases', '`' + process.env.PREFIX + command.aliases.join('`, `') + '`')
        embed.setFooter('Mary, un bot pour la Chapelle.', 'https://mirrors.creativecommons.org/presskit/icons/cc.png');
        return embed
      }
    } else {
      const categoriesMapped = {
        Staff: {}
      }

      commands.forEach(cmd => {
        if(cmd.category === 'hidden')
          return
        if(!cmd.permsAllowed.some(x => message.member.hasPermission(x)))
          return

        const category = categoriesMapped[cmd.category]

        category[cmd.name] = {
          name: cmd.name,
          description: cmd.description,
          aliases: cmd.aliases,
          usage: cmd.usage(process.env.PREFIX)
        }
      })

      embed.setTitle('Carte d\'aide pour toutes les commandes')
        .addField('Pour plus d\'aide sur une commande:', `\`${process.env.PREFIX}aide {commande}\`\nExemple: \`${process.env.PREFIX}aide projet\``)

      for (const [cat, commandsList] of Object.entries(categoriesMapped)) {
        const field = []
        for (const [name, details] of Object.entries(commandsList)) {
          field.push(`**${name}**: ${details.usage}`)
        }
        if(field.length > 0)
          embed.addField(`**${cat}:**`, field)
      }
      embed.setFooter('Mary, un bot pour la Chapelle.', 'https://mirrors.creativecommons.org/presskit/icons/cc.png');
      return embed
    }
  }
};