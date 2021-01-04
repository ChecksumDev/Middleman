/*
Middleman - Peer Reviewed Image API"s.
Copyright (C) 2020 ChecksumDev

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
    if (!message.guild.id == '793034391738777670') return;
    if (!message.member.hasPermission("MANAGE_GUILD", { checkAdmin: true, checkOwner: true })) return message.reply("No permission.")
    const image = await Images.findOne({ where: { id: args[0] } });
    if (!image) return message.reply("That image has not been reviewed yet.");
    let embed = new Discord.MessageEmbed()
        .setAuthor("Starboard", "https://2.bp.blogspot.com/-hsuemZmkYBo/WJibJn2XtFI/AAAAAAAAAEc/zNVuRLIoq4o_WV6QMMOqx-gOfmbsFXYJgCLcB/s1600/star-icon.png")
        .setImage(`${image.url}`)
        .setColor("YELLOW")
        .setFooter("© Copyright Middleman 2020");
    await client.channels.cache.get('793337358866055178').send(embed).then(() => {
        message.reply(`Successfully starred image **${image.id}**.`)
    })
}