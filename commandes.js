const { MessageCollector, Client, RichEmbed } = require('discord.js');
const botconfig = require('./botconfig.json');
const prefix = process.env.PREFIX || botconfig.PREFIX;
 
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
exports.projet = function(message) {
    
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