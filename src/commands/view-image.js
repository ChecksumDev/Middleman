/*
Middleman - Peer Reviewed Image API"s.
Copyright (C) 2020 Konami Development

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
    const { Images } = require("../functions/database");
    const image = await Images.findOne({ where: { id: args[0] } });
    if (!image) return message.reply("That image has not been reviewed yet.");
    let embed = new Discord.MessageEmbed()
        .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
        .setImage(`${image.url}`)
        .setColor("#0D98BA");
    await message.reply(embed);
}