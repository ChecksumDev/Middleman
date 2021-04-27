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

const hat = require('hat');
const { MessageEmbed } = require("discord.js");
const { Apikeys } = require("../functions/database");
const { buildErrorMessage } = require("../functions/buildErrorMessage");

exports.run = async (client, message, args) => {
    if (message.author.id !== '573909482619273255') return message.reply(buildErrorMessage("Only Checksum#0001 can generate API keys for users."));
    const key = await Apikeys.findOne({ where: { user: args[0] } });
    if (key) return message.reply(buildErrorMessage("That user already has an API key assigned."));
    let generated = await Apikeys.create({
        key: hat().toUpperCase(),
        user: `${args[0]}`,
    });

    let embed = new MessageEmbed()
        .setTitle("Key generated")
        .setDescription(`👤 USER: ${args[0]}\n🔑 KEY: ||${generated.key}||`)
        .setFooter(`© Copyright Checksum`)
        .setColor("YELLOW");
    await message.author.send(embed).then(async () => {
        await message.channel.send(`Successfully generated an API Key.\nCheck your DMs.`)
    }).catch(async (err) => {
        if (err) {
            await message.channel.send(buildErrorMessage("Failed to send a message to that user."))
            return await generated.destroy();
        }
    });;
}