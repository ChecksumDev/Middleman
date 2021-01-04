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
    if (!message.member.hasPermission("MANAGE_GUILD", { checkAdmin: true, checkOwner: true })) return message.reply("No permission.")
    const image = await Images.findOne({ where: { id: args[0] } });
    if (!image) return message.reply("That image has not been reviewed yet.");

    let embed = new Discord.MessageEmbed()
        .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Are you sure you want to delete the image **${args[0]}**?\nRating: ${image.rating}\n\n:warning: ***Please click the trashcan to confirm, there is no way to revert your decision.***`)
        .setImage(`${image.url}`)
        .setColor("RED");
    message.reply(embed).then(async (result) => {
        await result.react('🗑️');
        const filter = (reaction, user) => {
            return ['🗑️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        await result.awaitReactions(filter, { max: 1 })
            .then(async collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '🗑️') {
                    await Images.destroy({ where: { id: args[0] } });
                    await result.delete();
                    return message.reply(`The image **${args[0]}** has been marked for review.`);
                } else {
                    return message.reply("You cancled the deletion.");
                }
            })
    })
}
