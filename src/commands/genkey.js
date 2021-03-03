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
    const { Apikeys } = require("../functions/database");
    const hat = require('hat');
    if (message.author.id !== '573909482619273255') return message.reply("Only Checksum#0001 can generate API keys for users.");
    const key = await Apikeys.findOne({ where: { user: args[0] } });
    if (key) return message.reply("That user already has an API key assigned.");
    let genkey = hat().toUpperCase();
    await Apikeys.create({
        key: genkey,
        user: `${args[0]}`,
    });

    let embed = new MessageEmbed()
        .setTitle("Key generated")
        .setDescription(`USER: ${args[0]}\nKEY: ||${genkey}||`)
        .setFooter(`© Copyright Checksum`)
        .setColor("YELLOW");
    await message.author.send(embed);
}