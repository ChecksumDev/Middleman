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

const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const { Users } = require("../functions/database");

    let users = await Users.findAll({ limit: 5, order: [['count', 'DESC']] });
    for (const user of users) {
        await client.users.fetch(user.userid);
    }
    let embed = new MessageEmbed()
        .setAuthor("Middleman Leaderboard", `${client.user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(users.sort((a, b) => b.count - a.count)
            .filter(user => client.users.cache.has(user.userid))
            .map((user, position) => `**${position + 1}**. ${(client.users.cache.get(user.userid))}: ${user.count} Points`)
            .join('\n'))
            .setThumbnail(`https://i.ibb.co/ByRSBmB/hp.png`)
        .setColor("#d70069");
    await message.reply(embed)
}