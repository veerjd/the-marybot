// Extract the required classes from the discord.js module
require('dotenv').config()
const { MessageCollector, Client, RichEmbed } = require('discord.js');
const util = require('./util');
const commandes = require('./commandes');
const warningMessage = `Normalement, il faut mentionner les rôles ou personnes concernées quand tu fais une requête. Pas besoin de recommencer, fais juste écrire un nouveau message en tagant les personnes concernées (en utilisant le \`@\`).\nCe message s'autodétruira dans quelques secondes.`;

// Create an instance of a Discord client
const client = new Client();

const express = require('express');

var app = express();

client.on('ready', () => {
    const prefix = process.env.PREFIX;
    console.log(`Logged in as ${client.user.username}`);
    client.user.setActivity(`préfixe: ${prefix}`, { type: 'LISTENING' });
});

//--------------------------------------
//
//           EVENT ON RAW
//
//--------------------------------------
client.on('raw', event => {
if(event.t === "MESSAGE_REACTION_ADD") {
//--------------------------------------
//          ADD.RÉACTION->ROLE
//--------------------------------------
    if (event.d.channel_id === "572430115389308939" || event.d.channel_id==="563104709968265219") {
    const user = client.users.get(event.d.user_id);
    const guild = client.guilds.get(event.d.guild_id);
    guildMember = guild.members.get(user.id);
    switch (event.d.emoji.name) {
        case "🇷":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "rosemont");
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "🇲":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "mile-end");
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "🇦":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "ahuntsic");
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "🇬":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "gatineau");
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "📽":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "prod")
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "🔩":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "operations")
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "🎵":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "musique")
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "🐤":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "junior")
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "📱":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "treize10huit")
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
        case "📣":
        newRole = guild.roles.find(x => x.name.toLowerCase() === "comm")
        guildMember.addRole(newRole)
            .then(console.log(`The role ${newRole.name} was added to ${user.username}`))
            .catch(console.error);
        break
    }
    }
//--------------------------------------
//                REPLY
//--------------------------------------
    if(event.d.emoji.name === "reply") {
    const user = client.users.get(event.d.user_id);
    const channel = client.channels.get(event.d.channel_id);

    // if you're on the master/v12 branch, use `channel.messages.fetch()`
    channel.fetchMessage(event.d.message_id)
        .then(message => {
            let author;

            if (message.guild.members.get(message.author.id) === "undefined") {
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
                .addBlankField(true)
                .addField(`**`+message.content+`**`, message.url)
                .addBlankField(true)
                .setFooter('Message original envoyé')
                .setTimestamp(message.createdAt);
        channel.send(replyEmbed);
        })
        .catch(console.error);
    }
}
//--------------------------------------
//        REMOVE.RÉACTION->ROLE
//--------------------------------------
if(event.t === "MESSAGE_REACTION_REMOVE") {
    if (event.d.channel_id === "572430115389308939" || event.d.channel_id==="563104709968265219") {
    const user = client.users.get(event.d.user_id);
    const guild = client.guilds.get(event.d.guild_id);
    guild.fetchMember(user)
        .then(guildMember => {
        switch (event.d.emoji.name) {
            case "🇷":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "rosemont");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "🇲":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "mile-end");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "🇦":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "ahuntsic");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "🇬":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "gatineau");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "📽":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "prod");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "🔩":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "operations");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "🎵":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "musique");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "🐤":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "junior");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "📱":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "treize10huit");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
            case "📣":
            removedRole = guild.roles.find(x => x.name.toLowerCase() === "comm");
            guildMember.removeRole(removedRole)
                .then(console.log(`The role ${removedRole.name} was removed from ${user.username}`))
                .catch(console.error);
            break;
        }
        });
    }
}
});

//--------------------------------------
//
//          EVENT ON MESSAGE
//
//--------------------------------------
client.on('message', message => {
    prefix = process.env.PREFIX;
    
    if(message.author.bot || message.content.startsWith("?"))
        return;

    //--------------------------------------
    //       ANNONCES GLOBAL->LOCAL
    //--------------------------------------
    globalServer = client.guilds.find(x=>x.name == '[Global] La Chapelle');

    if (message.channel.name === "annonces-officielles" && message.guild === globalServer) {
        localServer = client.guilds.find(x=>x.name == '[Local] La Chapelle');
        localAnnonces = localServer.channels.find(x=>x.name=='annonces-officielles');
        let c = new RichEmbed()
            .setAuthor("Une nouvelle annonce dans le server Global:")
            .setColor(0xF5F5DC)
            .setTitle(message.cleanContent);
        localAnnonces.send(c);
    }

    //--------------------------------------
    //         AUTO-RESPONDER TAG
    //--------------------------------------
    if(message.mentions.users.first() === undefined && message.mentions.roles.first() === undefined) {
        console.log(`There are no mentions`);
        if (message.channel.name.includes("annonce") && message.channel.name != "annonces-officielles") {
            message.channel.send(`${message.author}`)
                .then(msg => {
                    setTimeout(()=>msg.delete(), 30000);
                })
                .catch(console.error());
            message.channel.send(warningMessage)
                .then(msg => {
                    console.log(`Avertissement de mentions envoyé dans ${message.channel.name}`);
                    setTimeout(()=>msg.delete(), 30000);
                })
                .catch(console.error());
        } else if (message.channel.name === "annonces-officielles" && message.guild === globalServer) {
            message.author.createDM()
                .then(x => {
                    x.send(`Tu viens de publier dans ${message.channel}`)
                        .then(x => {})
                        .catch(console.error);
                    x.send(warningMessage)
                        .then(console.log(`DM d'avertissement envoyé à ${message.author.name}.`))
                        .catch(console.error);
                })
                .catch(console.error);
        } else if (message.channel.name.includes("question")) {
            message.channel.send(`${message.author}`)
                .then(msg => {
                    setTimeout(()=>msg.delete(), 30000);
                })
                .catch(console.error());
            message.channel.send(warningMessage)
                .then(msg => {
                    console.log(`Avertissement de mentions envoyé dans ${message.channel.parent.name}/${message.channel.name}`);
                    setTimeout(()=>msg.delete(), 30000);
                })
                .catch(console.error());
        } else if (message.channel.name.includes("requêtes") && message.channel.name != "requêtes-de-prière") {
            message.channel.send(`${message.author}`)
                .then(msg => {
                    setTimeout(()=>msg.delete(), 30000);
                })
                .catch(console.error());
            message.channel.send(warningMessage)
                .then(msg => {
                    console.log(`Avertissement de mentions envoyé dans ${message.channel.parent.name}/${message.channel.name}`);
                    setTimeout(()=>msg.delete(), 30000);
                })
                .catch(console.error());
        } else {
            console.log(`But is was written in a channel that doesn't require pinging.`);
        }
    } else {
        console.log(`There are mentions. No warning sent.`);
    }

    //--------------------------------------
    //           MANAGE MESSAGES
    //--------------------------------------
    if(!message.member.hasPermission('MANAGE_MESSAGES') && message.channel.name != "bienvenue")
        return message.channel.send("Ils semble que tu ne puisses pas utiliser mes commandes, oups!");
    
    const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    if(message.content.startsWith(prefix)) {
        console.log(`cmd: ${cmd}`);
        console.log("args: ", args);
    }
    //--------------------------------------
    //          COMMANDE: FETCH
    //--------------------------------------
    if(cmd === "fetch") {
        message.channel.fetchMessage(args[0])
            .then(x => {
                console.log(x);
                console.log(x.author);
                message.channel.send(`Tu peux aller voir les logs.`);
                message.delete();
            })
            .catch(console.error);
    }
    //--------------------------------------
    //           COMMANDE: AIDE
    //--------------------------------------
    if (cmd === "aide") {
        commandes.aide(message, args.toString());
    //    let embedhelpadmin = commande.aide(args);
    //    return message.channel.send(embedhelpadmin);
    }

    if (cmd === "fetch") {
        message.channel.fetchMessage(577892811010211851)
            .then()
            .catch(console.error);
    }

    //--------------------------------------
    //      COMMANDE: NOUVEAU PROJECT
    //--------------------------------------
    if(cmd === "project" || cmd === "projet") {
        commandes.projet(args, message);
    }

    //--------------------------------------
    //         COMMANDE: ARCHIVE
    //--------------------------------------
    if(cmd === "archive") {
        if (message.mentions.channels.first()) {
            commandes.archive(message.mentions.channels.first())
        } else {
            commandes.archive(message.channel);
        }

        const archiveLog = util.findChanneByStr(client, "log-archive");

        archiveLog.send(`${message.channel} a été archivé le **${message.createdAt}** par ${message.author.username}.`);
        message.channel.send(`Ce channel a été archivé le **${message.createdAt}** par ${message.author.username}.`);
        message.delete();
    }
    });

//--------------------------------------
//
//            EVENT ON JOIN
//
//--------------------------------------
    client.on('guildMemberAdd', newMember => {
        newMember.createDM()
            .then(DMs => {
                channelRoles = newMember.guild.channels.find(chan => chan.name === "assignation-de-rôles");
                channelNouveau = newMember.guild.channels.find(chan => chan.name === "pour-les-nouveaux");
                DMs.send(`Bienvenue **${newMember.user}** dans l'outil de communication de la Chapelle!
Tu n'as qu'à aller dans le channel ${channelRoles} de l'équipe **${newMember.guild}** et réagir avec les emojis qui correspondent à tes rôles!
Si tu as des questions, tu peux toujours écrire dans ${channelNouveau} à la même place.`);
                console.log(`${newMember.user.username} est arrivé!`);
            })
            .catch(console.error);
    });

//--------------------------------------
//
//           EVENT ON LEAVE
//
//--------------------------------------
    client.on('guildMemberRemove', oldMember => {
        oldMember.createDM()
            .then(DMs => {
                DMs.send(`Si tu as quitté par erreur, tu peux rejoindre les deux équipes (global et local) avec ces liens, sinon on se reverra peut-être!\n
[Global] La Chapelle: https://discord.gg/NpND6qj`);
                DMs.send(`[Local] La Chapelle: https://discord.gg/jsGCDzu`);
                console.log(`${oldMember.user.username} est parti!`);
                quitteChannel = oldMember.guild.channels.find(x => x.name === "quitte");
                quitteChannel.send(`${oldMember.user.username} est parti!`);
            })
            .catch(console.error);
});

//--------------------------------------
//              END/OTHER
//--------------------------------------
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});

client.login(process.env.TOKEN);