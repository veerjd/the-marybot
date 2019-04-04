const { MessageCollector, Client, RichEmbed } = require('discord.js');
const aide = require('./aide');

exports.aide = function(cmd) {
    if (cmd)
        return aide.commande(cmd);
    else
        console.log ("Entré dans .aide()");
        return aide.aide();
}

exports.projet = function(arg) {
    
}

exports.archive = function(arg) {
    
}