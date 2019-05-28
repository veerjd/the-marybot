const { MessageCollector, Client, RichEmbed } = require('discord.js');
const prefix = process.env.PREFIX;
const util = require('./util');
 
let allCmds = new Map();

allCmds.set(`archive`, {
    nom : `archive`,
    description : `Archiver le channel en question ou le channel mentionné.`,
    usage : `${prefix}archive`
});

allCmds.set(`projet`, {
    nom : `projet`,
    description : `La création de projet qui donne les accès aux personnes mise en arguments.`,
    usage : `${prefix}projet *NOM UTILISATEUR UTILISATEUR*`,
    exemple : `${prefix}projet brochure-2018 jean-daniel julien alexis`
});

//--------------------------------------
//               ARCHIVE
//--------------------------------------
exports.archive = function(message, channel) {
    const archiveLog = util.findChanneByStr(message.guild, "log-archive");
    console.log(`archiveLog: `,`${archiveLog.name}`);
    const archiveCategory = util.archiveCategory(channel.client);
    console.log(`archiveCategory: `,`${archiveCategory.name}`);

    if(archiveCategory === message.channel.parent) {
        console.log("Le channel est déjà archivé!");
        return;
    } else {
        channel.setParent(archiveCategory)
            .then(movedChannel=>{
                movedChannel.lockPermissions();
                /*perms = archiveCategory.permissionOverwrites; OLD WAY TO DO IT
                movedChannel.replacePermissionOverwrites({
                    overwrites: perms,
                })*/
                console.log("Permissions synchronisées!");
                archiveLog.send(`${channel} a été archivé le **${message.createdAt}** par ${message.author}.`)
                    .then(()=>{})
                    .catch(console.error)
                message.channel.send(`Ce channel a été archivé le **${message.createdAt}** par ${message.author}.`)
                    .then(console.log("Message d'archive envoyé!"))
                    .catch(console.error);
            })
            .catch(console.error);
    }
}
//--------------------------------------
//              PROJET
//--------------------------------------
exports.projet = function(args, message) {

    if(message.guild.name === "[Local] La Chapelle") {
        message.channel.send("Les projets doivent être absolument créées dans le server Global.")
            .then(console.log("Le message a été composé dans le server local"))
            .catch(console.error);
        return;
    }
    const nomProjet = args.shift(); // projet-orange
    const categProjets = util.projetCategory(message.guild.client);

    for(i=0;args[i];i=i+1) {
        if(!args[i].startsWith("<@")) {
            message.channel.send("Tous les arguments pour les permissions doivent être des mentions, \`@\`");
            return message.channel.send("Commande abortée.");
        }
    }
    console.log("Sorti du for qui détermine si tous les arguments sont des mentions");

    message.guild.createChannel(nomProjet)
        .then(newChannel => {
            newChannel.setParent(categProjets)
                .then(chan => {
                    chan.lockPermissions()
                        .then(() => {
                            console.log(`${newChannel.name} est dans la catégorie projets!`);
                            let permsArray = message.mentions.members.keyArray();
                            console.log("permsArray: ", permsArray);
                            permsArray = permsArray.concat(message.mentions.roles.keyArray());
                            console.log("permsArrayAfterRoles: ", permsArray);
                //**** PAS TOUS LES MENTIONS SE FONT DONNER LES PERMISSIONS
                            for(i=0;permsArray[i];i=i+1) {
                                console.log(`permsArray[${i}]`, permsArray[i]);
                                newChannel.overwritePermissions(permsArray[i], {
                                    VIEW_CHANNEL: true
                                })
                                    .then(x => {
                                        console.log(`Les permissions de ${x.name} ont été changées.`)
                                    })
                                    .catch(console.error);
                            };
                        })
                        .catch(console.error)
                })
                .catch(console.error);
//If all mentions

            
            
//No mentions
        /*for(i=0;args[i] && !args[i].startsWith("@");i=i+1) {
            var newMember = message.guild.members.find(u => u.nickname.toLowerCase().includes(args[i]));
            if(newMember) {
            permsArray.push(newMember);
            nicknameArray.push(newMember.nickname);
            }
        }*/
        })
        .catch(console.error);
}

//--------------------------------------
//                AIDE
//--------------------------------------
exports.aide = function (msg, cmd) {
    const prefix = process.env.PREFIX;

    let c = new RichEmbed()
        .setColor(0xF5F5DC)
        .setFooter("Mary, un bot pour la Chapelle.", "https://mirrors.creativecommons.org/presskit/icons/cc.png");
    if (cmd.length == 0) {
        c.setAuthor("Commandes pour Admins.");
        allCmds.forEach(x => {
            c.addField(`${prefix}${x.nom}`, x.description);
        });
    } else {
        x = allCmds.get(cmd);
        c.setAuthor(`Aide pour la commande ${prefix}${x.nom}`);
        c.addField("description",x.description);
        c.addField("usage",x.usage);
        if(x.exemple) {
            c.addField("exemple",x.exemple);
        }
    }
    msg.channel.send(c)
        .then(() => {console.log(`Commande d'aide réussi!`)})
        .catch(console.error);
};