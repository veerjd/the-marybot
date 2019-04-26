const { MessageCollector, Client, RichEmbed } = require('discord.js');
//const botconfig = require('./botconfig.json');
const prefix = process.env.PREFIX/* || botconfig.PREFIX*/;
 
//const categArchive = `542019038180540436`;
//const archiveChannel = `542019112839413790`;

const archiveAide = {
    nom : `archive`,
    description : `Archiver le channel en question ou le channel mentionné.`,
    usage : `${prefix}archive`,
    example : `${prefix}projet brochure-2018 jean-daniel julien alexis`
}

const projetAide = {
    nom : `projet`,
    description : `La création de projet qui donne les accès aux personnes mise en arguments.`,
    usage : `${prefix}projet *NOM UTILISATEUR UTILISATEUR*`,
    example : `${prefix}projet brochure-2018 jean-daniel julien alexis`
}
//--------------------------------------
//               ARCHIVE
//--------------------------------------
exports.archive = function(message, channel) {
    const archiveChannel = message.client.channels.find(x => x.name.toLowerCase() === "log-archive");
    console.log(`archiveChannel: `,`${archiveChannel.name}`);
    const categArchive = archiveChannel.parent;
    console.log(`categArchive: `,`${categArchive.name}`);

    if(channel) {
        channel.setParent(categArchive)
            .then(x => {
                archiveChannel.send(`${x} a été archivé le **${message.createdAt}** par ${message.author.username}.`);
                x.send(`Ce channel a été archivé le **${message.createdAt}** par ${message.author.username}.`);
            })
            .catch(console.error);
    } else {
        message.channel.setParent(categArchive)
            .then(x => {
                archiveChannel.send(`${message.channel} a été archivé le **${message.createdAt}** par ${message.author.username}.`);
                x.send(`Ce channel a été archivé le **${message.createdAt}** par ${message.author.username}.`);
            })
            .catch(console.error);
    }
    message.delete();
}
//--------------------------------------
//              PROJET
//--------------------------------------
exports.projet = function(args, guild) {
    const nomProjet = args.shift(); // projet-orange
    
    guild.createChannel(nomProjet)
        .then(async newChannel => {
        await newChannel.setParent(categProjets) // 
        newChannel.overwritePermissions(guild.defaultRole, {
            VIEW_CHANNEL: false
        });
        newChannel.overwritePermissions(roleStaff, {
            VIEW_CHANNEL: true
        });
//If all mentions
        let permsArray = message.mentions.members.keyArray();
        let nicknameArray = [];
        permsArray = permsArray.concat(message.mentions.roles.keyArray());
//No mentions
        for(i=0;args[i] && !args[i].startsWith("@");i=i+1) {
            var newMember = guild.members.find(u => u.nickname.toLowerCase().includes(args[i]));
            if(newMember) {
            permsArray.push(newMember);
            nicknameArray.push(newMember.nickname);
            }
        }

//CONFIRMATION
        collector = new MessageCollector(message.channel,m => m.author.id === message.author.id,{ time: 10000 });
        console.log(collector);
        collector.on('collect', m => {
            if (m.content.toLowerCase() == "oui") {
                m.channel.send(`Tu as dit \`oui\`!`);
                for(i=0;permsArray[i];i=i+1) {
                newChannel.overwritePermissions(permsArray[i], {
                    VIEW_CHANNEL: true
                });
                }
            } else if (m.content.toLowerCase() == "non") {
                m.channel.send(`Tu as dit \`non\`!`);
            }
        });
//Add permissions
        })//end of promise
        .catch(console.error);
}

//--------------------------------------
//                AIDE
//--------------------------------------
exports.aide = function (cmd) {
    let c = new RichEmbed()
      .setAuthor("Commandes pour Admins.")
      .setColor(0xF5F5DC)
      .setFooter("Ⓒ 2019 Example Bot.", client.user.displayAvatarURL);
    for(i=0;c[i];i++) {
      c.addField(undefined,`nom: ${allCmds[i].nom}, description: ${allCmds[i].description}`, false);
    }
    return c;
};