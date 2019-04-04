const { MessageCollector, Client, RichEmbed } = require('discord.js');

exports.projet = {
    nom: 'projet',
    aliases: 'nvProjet',
    description: 'Permet de créer un projet dans la catégorie "projet" avec les permissions décrites',
    usage: '!projet brochure @comm @jd @louis-pier'
}

exports.archive = {
    nom: 'archive',
    aliases: '',
    description: 'Transfer le channel dans lequel la commande a été faite dans la catégorie "archive" et notifie dans #log-archive',
    usage: '!archive'
}

exports.aide = function () {
    let c = new RichEmbed()
      .setAuthor("Commandes pour Admins.")
      .setColor(0xF5F5DC)
      .setFooter("Ⓒ 2019 Example Bot.", client.user.displayAvatarURL);
    for(i=0;c[i];i++) {
      c.addField(undefined,`nom: ${allCmds[i].nom}, description: ${allCmds[i].description}`, false);
    }
    return c;
};

exports.commande = function (arg) {

//    return c
};