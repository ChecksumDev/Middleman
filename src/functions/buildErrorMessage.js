let { MessageEmbed } = require('discord.js');

function buildErrorMessage(error) {
    let embed = new MessageEmbed()
    .setTitle("An error has occured!")
    .setDescription(`***\`${error}\`***`)
    .setFooter(`© Copyright Checksum`)
    .setColor("RED")
    .setTimestamp();
    return embed;
}

exports.buildErrorMessage = buildErrorMessage;