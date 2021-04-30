require('dotenv').config();
const { Client, MessageEmbed, Collection } = require('discord.js');
const bot = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs')
const prefix = process.env.PREFIX

// bot.commands as a collection(Map) of commands from ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
bot.commands = new Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

// --------------------------------------
//
//       EVENT ON LOGIN
//
// --------------------------------------
bot.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${bot.user.username}`);

  bot.user.setActivity(`${prefix}aide`, { type: 'PLAYING' })
});

// --------------------------------------
//
//         EVENT ON ROLE UPDATE
//
// --------------------------------------
bot.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.roles.cache === newMember.roles.cache) // Si l'événement n'est pas un changement de rôle
    return;

  let otherGuild;
  let memberOtherGuild;
  let otherRole;

  if (newMember.guild.name === '[Local] La Chapelle') {
    otherGuild = bot.guilds.cache.find(val => val.name === '[Global] La Chapelle');
  } else if (newMember.guild.name === '[Global] La Chapelle') {
    otherGuild = bot.guilds.cache.find(val => val.name === '[Local] La Chapelle');
  }

  if (otherGuild.members.cache.get(newMember.id)) {
    memberOtherGuild = otherGuild.members.cache.get(newMember.id);
  } else {
    return
  }


  if (oldMember.roles.cache.size > newMember.roles.cache.size) { // Si le rôle est enlevé
    for (const [key, value] of oldMember.roles.cache) { // Loop les rôles avant le changement (comparé celui qui en a le plus)
      if (oldMember.roles.cache.get(key) != newMember.roles.cache.get(key)) { // Cherche le rôle enlevé
        console.log(`@${value.name} removed from ${newMember.user.username} in ${newMember.guild.name}!`);
        otherRole = otherGuild.roles.cache.find(r => r.name === value.name);
        if (otherRole) {
          memberOtherGuild.roles.remove(otherRole)
            .then(console.log(`@${value.name} also removed from ${otherGuild}.`))
            .catch(console.error);
        } else {
          return;
        }
      }
    }
  } else if (oldMember.roles.cache.size < newMember.roles.cache.size) { // Si le rôle est ajouté
    for (const [key, value] of newMember.roles.cache) { // Loop les rôles après le changement (comparé celui qui en a le plus)
      if (oldMember.roles.cache.get(key) != newMember.roles.cache.get(key)) { // Cherche le rôle ajouté
        console.log(`@${value.name} added from ${newMember.user.username} in ${newMember.guild.name}!`);
        otherRole = otherGuild.roles.cache.find(r => r.name === value.name);
        if (otherRole) {
          memberOtherGuild.roles.add(otherRole)
            .then(console.log(`@${value.name} also added in ${otherGuild}.`))
            .catch(console.error);
        } else {
          return;
        }
      }
    }
  }
});

// --------------------------------------
//
//        EVENT ON REACTION ADD
//
// --------------------------------------
bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();

  const guild = reaction.message.guild;
  const channel = reaction.message.channel;
  const guildMember = guild.member(user);
  const assignChannelIDs = ['837483858110578758', '837657304727552040']

  if (!assignChannelIDs.some(assignChannel => assignChannel === channel.id) || !channel.name.startsWith('assignation'))
    return

  const newRole = guild.roles.cache.find(x => x.name.toLowerCase() === reaction.message.content.toLowerCase())
  guildMember.roles.add(newRole)
    .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
    .catch(console.error);
})

// --------------------------------------
//
//       EVENT ON REACTION REMOVE
//
// --------------------------------------
bot.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();

  const guild = reaction.message.guild;
  const channel = reaction.message.channel;
  const guildMember = guild.member(user);
  const assignChannelIDs = ['837483858110578758', '837657304727552040']

  if (!assignChannelIDs.some(assignChannel => assignChannel === channel.id) || !channel.name.startsWith('assignation'))
    return

  const removedRole = guild.roles.cache.find(x => x.name.toLowerCase() === reaction.message.content.toLowerCase())
  guildMember.roles.remove(removedRole)
    .then(console.log(`${user.username} s'est ajouté ${removedRole.name} dans ${removedRole.guild.name}`))
    .catch(console.error);
})

// --------------------------------------
//
//      EVENT ON MESSAGE
//
// --------------------------------------
bot.on('message', async message => {
  if (message.author.bot || !message.content.startsWith(prefix) || message.content === prefix)
    return

  // Handling
  const textStr = message.content.slice(prefix.length)
  const commandName = textStr.split(/ +/).shift().toLowerCase();
  const argsStr = textStr.slice(commandName.length + 1)

  // Map all the commands
  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // Return if the command doesn't exist
  if (!command)
    return

  // Instantiate the embed that's sent to every command execution
  const embed = new MessageEmbed().setColor('#F5F5DC')

  // Check if command is allowed in that channel
  if (command.channelsAllowed) { // Certain commands can only be triggered in specific channels
    if (!(command.channelsAllowed && command.channelsAllowed.some(x => x === message.channel.id)))
      return
  }

  // Check if the user has the permissions necessary to execute the command
  if (!(command.permsAllowed.some(x => message.member.hasPermission(x)) || command.usersAllowed.some(x => x === message.author.id)))
    return message.channel.send('Seul le staff peut utiliser cette commande!')

  try {
    // EXECUTE COMMAND
    const reply = await command.execute(message, argsStr, embed);

    // if there's a reply, send it
    if (reply)
      message.channel.send(reply)
        .then().catch(console.error)
    return
  } catch (error) {
    const globalBuild = bot.guilds.cache.find(val => val.name === '[Global] La Chapelle')
    const errorLogChannel = globalBuild.channels.cache.find(x => x.name === 'mary-error-logs')
    console.log('error')
    errorLogChannel.send(`${error}`)
    return message.channel.send(`${error}`)
      .then().catch(console.error)
  }
})

// --------------------------------------
//
//            EVENT ON JOIN
//
// --------------------------------------
bot.on('guildMemberAdd', newMember => {
  newMember.createDM()
    .then(DMs => {
      const channelRoles = newMember.guild.channels.cache.find(chan => chan.name === 'assignation-de-rôles');
      const channelNouveau = newMember.guild.channels.cache.find(chan => chan.name === 'soutien');
      DMs.send(`Bienvenue **${newMember.user}** dans l'outil de communication de la Chapelle!
Tu n'as qu'à aller dans le channel ${channelRoles} de l'équipe **${newMember.guild}** et réagir avec les emojis qui correspondent à tes rôles!
Si tu as des questions, tu peux toujours écrire dans ${channelNouveau} à la même place.`)
        .then().catch(() => console.log('Couldn\'t send the DM'))
      console.log(`${newMember.user.username} est arrivé!`);
    })
    .catch(console.error);
});

// --------------------------------------
//
//           EVENT ON LEAVE
//
// --------------------------------------
bot.on('guildMemberRemove', oldMember => {
  oldMember.createDM()
    .then(DMs => {
      DMs.send(`Si tu as quitté par erreur, tu peux rejoindre les deux équipes (Global et Local) avec ces liens, sinon on se reverra peut-être!\n
[Global] La Chapelle: https://discord.gg/g2GfCNU`)
        .then().catch(() => console.log('Couldn\'t send the DM'))
      DMs.send('[Local] La Chapelle: https://discord.gg/mBHuA2r')
        .then().catch(() => console.log('Couldn\'t send the DM'))
      console.log(`${oldMember.user.username} est parti!`);
      const quitteChannel = oldMember.guild.channels.cache.find(x => x.name === 'quitte');
      quitteChannel.send(`${oldMember.user} (${oldMember.user.username}) est parti!`);
    })
    .catch(console.error);
});

bot.login(process.env.TOKEN);