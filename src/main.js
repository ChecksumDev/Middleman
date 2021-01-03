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

// Static Deps
require("dotenv").config();
const logger = require("./functions/logger");
let prefix = 'm?'

// Main Deps
const Discord = require("discord.js");
const client = new Discord.Client();
exports.client = client;

const { sendImage } = require("./functions/sendImage");
const { Images } = require("./functions/database");


client.once("ready", async () => {
    Images.sync();
    logger.log(`${client.user.tag} (${client.user.id}) logged into the Discord API!`)
    client.user.setPresence({
        activity: {
            name: "Checksum#0001",
            type: "WATCHING"
        },
        status: "dnd",
    })

    client.guilds.cache.get('793034391738777670').channels.cache.forEach(async ch => {
        if (!ch.name.startsWith("review")) return;
        await ch.send("The bot was restarted, rebooting review process.");
        sendImage(ch);
    })
});

client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == "eval") {
        if (message.author.id !== '573909482619273255') return message.reply("You're not my dad!");
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }

    if (command == "fav") {
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

    if (command == "delete-image") {
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
})

client.login();