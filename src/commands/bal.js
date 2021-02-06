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
    const { Users } = require("../functions/database");
    const user = await Users.findOne({ where: { userid: message.author.id } });
    if (!user) {
        await Users.create({
            userid: `${message.author.id}`,
            count: 0,
        });
    }
    let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}'s Balance`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setThumbnail(`https://i.ibb.co/ByRSBmB/hp.png`)
        .setDescription(`${message.author.username} currently has ${user.count} points.`)
        .setColor("#d70069")
    await message.reply(embed);
}