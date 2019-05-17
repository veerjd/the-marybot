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
exports.archive = function(channel) {
    channel.send("La commande est présentement en développement, désolé!");
    const archiveLog = util.findChanneByStr(channel.client, "log-archive");
    console.log(`archiveLog: `,`${archiveLog.name}`);
    const archiveCategory = util.archiveCategory(channel.client);
    console.log(`archiveCategory: `,`${archiveCategory.name}`);

    channel.setParent(archiveCategory)
        .then(movedChannel=>{
            perms = archiveCategory.permissionOverwrites;
            movedChannel.replacePermissionOverwrites({
                overwrites: perms,
            })
            console.log("Permissions synchronisées!");
        })
        .catch(console.error);
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
exports.aide = function (msg, cmd, botAvatar) {
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