require('dotenv').config();
const { Client, MessageEmbed, Collection } = require('discord.js');
const bot = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs')
const warningMessage = 'Normalement, il faut mentionner les rôles ou personnes concernées quand tu fais une requête. Pas besoin de recommencer, fais juste écrire un nouveau message en tagant les personnes concernées (en utilisant le `@`).\nCe message s\'autodétruira dans quelques secondes.'
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
  let otherGuild;
  let userOtherGuild;
  let otherRole;

  if (oldMember.roles === newMember.roles) // Si l'événement n'est pas un changement de rôle
    return;
  else { // Si l'événement n'est pas un changement de rôle
    if (newMember.guild.name === '[Local] La Chapelle') {
      otherGuild = bot.guilds.find(val => val.name === '[Global] La Chapelle');
    } else if (newMember.guild.name === '[Global] La Chapelle') {
      otherGuild = bot.guilds.find(val => val.name === '[Local] La Chapelle');
    }
    if(otherGuild.members.get(newMember.id)) {
      userOtherGuild = otherGuild.members.get(newMember.id);
      console.log('The user exists on the other server');
    } else {
      console.log('The user doesn\'t exist on the other server, the role change was stopped.')
      return;
    }


    if (oldMember.roles.size > newMember.roles.size) { // Si le rôle est enlevé
      for (const [key, value] of oldMember.roles) { // Loop les rôles avant le changement (comparé celui qui en a le plus)
        if(oldMember.roles.get(key) != newMember.roles.get(key)) { // Cherche le rôle enlevé
          console.log(`@${value.name} removed from ${newMember.user.username} in ${newMember.guild.name}!`);
          otherRole = otherGuild.roles.find(r => r.name === value.name);
          if(otherRole && otherRole.name != 'nouveau') {
            userOtherGuild.removeRole(otherRole)
              .then(console.log(`@${value.name} also removed from ${otherGuild}.`))
              .catch(console.error);
          } else {
            return;
          }
        }
      }
    } else if (oldMember.roles.size < newMember.roles.size) { // Si le rôle est ajouté
      for (const [key, value] of newMember.roles) { // Loop les rôles après le changement (comparé celui qui en a le plus)
        if(oldMember.roles.get(key) != newMember.roles.get(key)) { // Cherche le rôle ajouté
          console.log(`@${value.name} added from ${newMember.user.username} in ${newMember.guild.name}!`);
          otherRole = otherGuild.roles.find(r => r.name === value.name);
          if(otherRole && otherRole.name != 'nouveau') {
            userOtherGuild.addRole(otherRole)
              .then(console.log(`@${value.name} also added in ${otherGuild}.`))
              .catch(console.error);
          } else {
            return;
          }
        }
      }
    }
  }
});

// --------------------------------------
//
//           EVENT ON RAW
//
// --------------------------------------
bot.on('raw', event => {
  // --------------------------------------
  //          ADD.RÉACTION->ROLE
  // --------------------------------------
  if(event.t === 'MESSAGE_REACTION_ADD') {
    if (event.d.channel_id === '572430115389308939' || event.d.channel_id === '563104709968265219') {
      const user = bot.users.get(event.d.user_id);
      const guild = bot.guilds.get(event.d.guild_id);
      guildMember = guild.members.get(user.id);
      switch (event.d.emoji.name) {
      case '🇷':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'rosemont');
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '🇲':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'mile-end');
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '🇦':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'ahuntsic');
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '🇬':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'gatineau');
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '📽':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'prod')
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '🔩':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'opérations')
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '🎵':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'musique')
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '🐤':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'junior')
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '📱':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'treize10huit')
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      case '📣':
        newRole = guild.roles.find(x => x.name.toLowerCase() === 'comm')
        guildMember.addRole(newRole)
          .then(console.log(`${user.username} s'est ajouté ${newRole.name} dans ${newRole.guild.name}`))
          .catch(console.error);
        break
      }
    }
    // --------------------------------------
    //               REPONSE
    // --------------------------------------
    guild = bot.guilds.find(x => x.id == event.d.guild_id);
    channel = guild.channels.find(x => x.id == event.d.channel_id);

    if(event.d.emoji.name === 'reponse' && (!channel.name.includes('annonce') || channel.name == 'annonces-dimanche')) {
      const user = bot.users.get(event.d.user_id);
      const channel = bot.channels.get(event.d.channel_id);

      // if you're on the master/v12 branch, use `channel.messages.fetch()`
      channel.fetchMessage(event.d.message_id)
        .then(message => {
          let author;

          if (message.guild.members.get(message.author.id) === 'undefined') {
            author = message.guild.members.get(message.author.id).nickname;
          } else {
            author = message.author.username;
          }

          if (!author) {
            author = message.author.username;
          }

          // custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
          // if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
          const replyEmbed = new RichEmbed()
            .setColor('#AAFFFF')
            .setAuthor(author, message.author.displayAvatarURL)
            .setTitle(`Ce message a été rappeler par **${user.username}**`)
            .addField('**Message :**', '**' + message.cleanContent + '**')
            .addField('**Lien :**', message.url)
            .setFooter('Message original envoyé')
            .setTimestamp(message.createdAt);
          channel.send(replyEmbed);
        })
        .catch(console.error);
    }
  }
  // --------------------------------------
  //        REMOVE.RÉACTION->ROLE
  // --------------------------------------
  if(event.t === 'MESSAGE_REACTION_REMOVE') {
    if (event.d.channel_id === '572430115389308939' || event.d.channel_id === '563104709968265219') {
      const user = bot.users.get(event.d.user_id);
      const guild = bot.guilds.get(event.d.guild_id);
      guild.fetchMember(user)
        .then(guildMember => {
          switch (event.d.emoji.name) {
          case '🇷':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'rosemont');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '🇲':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'mile-end');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '🇦':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'ahuntsic');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '🇬':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'gatineau');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '📽':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'prod');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '🔩':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'opérations');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '🎵':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'musique');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '🐤':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'junior');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '📱':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'treize10huit');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          case '📣':
            removedRole = guild.roles.find(x => x.name.toLowerCase() === 'comm');
            guildMember.removeRole(removedRole)
              .then(console.log(`${user.username} s'est enlevé ${removedRole.name} dans ${removedRole.guild.name}`))
              .catch(console.error);
            break;
          }
        });
    }
  }
});
// --------------------------------------
//
//      EVENT ON MESSAGE
//
// --------------------------------------
bot.on('message', async message => {
  if(message.author.bot || !message.content.startsWith(prefix) || message.content === prefix)
    return

  const globalServer = bot.guilds.cache.find(x=>x.name == '[Global] La Chapelle');

  // If it's a DM
  if(message.channel.type === 'dm') {
    message.channel.send(`I do not support DM commands.\nYou can go into any server I'm in and do \`${prefix}help\` for all my commands.`)
      .then().catch(console.error)
  }

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

  // delete delays
  const generalDelete = { timeout: 5000 }

  // Warning when channel name includes general and delete both messages
  if(message.channel.name.includes('general'))
    return message.channel.send(`Come on! Not in #**${message.channel.name}**`)
      .then(x => {
        x.delete(generalDelete).then().catch(console.error)
        message.delete(generalDelete).then().catch(console.error)
      }).catch(console.error).catch(console.error)

  // Check if command is allowed in that channel
  if(command.channelsAllowed) { // Certain commands can only be triggered in specific channels
    if(!(command.channelsAllowed && command.channelsAllowed.some(x => x === message.channel.id)))
      return
  }

  // Check if the user has the permissions necessary to execute the command
  if(!(command.permsAllowed.some(x => message.member.hasPermission(x)) || command.usersAllowed.some(x => x === message.author.id)))
    return message.channel.send('Only an admin can use this command, sorry!')

  try {
    // EXECUTE COMMAND
    const reply = await command.execute(message, argsStr, embed);

    // if there's a reply, send it
    if(reply)
      message.channel.send(reply)
        .then().catch(console.error)
    return
  } catch (error) {
    // If error, log it and reply it
    console.log('error:', error)
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
      channelRoles = newMember.guild.channels.find(chan => chan.name === 'assignation-de-rôles');
      channelNouveau = newMember.guild.channels.find(chan => chan.name === 'soutien');
      DMs.send(`Bienvenue **${newMember.user}** dans l'outil de communication de la Chapelle!
Tu n'as qu'à aller dans le channel ${channelRoles} de l'équipe **${newMember.guild}** et réagir avec les emojis qui correspondent à tes rôles!
Si tu as des questions, tu peux toujours écrire dans ${channelNouveau} à la même place.`);
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
[Global] La Chapelle: https://discord.gg/g2GfCNU`);
      DMs.send('[Local] La Chapelle: https://discord.gg/mBHuA2r');
      console.log(`${oldMember.user.username} est parti!`);
      quitteChannel = oldMember.guild.channels.find(x => x.name === 'quitte');
      quitteChannel.send(`${oldMember.user} (${oldMember.user.username}) est parti!`);
    })
    .catch(console.error);
});

bot.login(process.env.TOKEN);