const { MessageCollector, Client, RichEmbed } = require('discord.js'); 

exports.cmd = function (cmd) {
    let c = new RichEmbed()
      .setAuthor("Commandes pour Admins.")
      .setColor(0xF5F5DC)
      .setFooter("Ⓒ 2019 Example Bot.", client.user.displayAvatarURL);
    for(i=0;c[i];i++) {
      c.addField(undefined,`nom: ${allCmds[i].nom}, description: ${allCmds[i].description}`, false);
    }
    return c;
};