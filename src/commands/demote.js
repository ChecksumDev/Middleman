/*
Middleman - Peer Reviewed Image API"s.
Copyright (C) 2020 Checksum

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

exports.run = async (client, message, args) => {
    const Discord = require("discord.js");
    let user = message.mentions.members.first()
    if (!user) return message.reply("Please specify someone to demote.")
    await user.roles.remove('793034521581846568').then(async m => {
        let embed = new Discord.MessageEmbed()
        .setTitle("You're privileges have been revoked.")
        .setDescription(`Hello ***${user}***\nYou have been revoked of your reviewing privlages due to inactivity, if you wish to reapply please message the current Head Reviewer.\n\n*If you believe this to be a mistake, please message the current head reviewer about your concerns.*`)
        .setColor("RED")
        .setFooter("© Copyright Checksum");
        await m.send(embed);
        await message.delete();
    })
}