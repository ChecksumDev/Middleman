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

const Discord = require("discord.js");
const { client } = require("../main");
const { Images, Users } = require('./database');
const { updateTotal } = require("./updateTotal");
const { getBooruImage } = require("./getBooruImage");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const jsondb = low(adapter)
const filesize = require('filesize');
const logger = require("./logger");
const { extname } = require("path");

async function startReview(channel) {
    let urlcache = await getBooruImage();
    let logch = client.channels.cache.get('793726527744245780');
    let bannedexts = [".zip", ".mp4", ".webm"]; // Deny these extensions (we do not support them) 
    await jsondb.read(); // Load the current size of the database

    if (bannedexts.includes(extname(urlcache))) return startReview(channel) // Return if the file extension is banned.

    const result = await Images.findOne({ where: { url: urlcache } });
    if (result) {
        logger.log(`Skipping ${urlcache}. The image has already been reviewed.`);
        return startReview(channel);
    };

    let orfs = await jsondb.get('total').value()
    let rfs = filesize(orfs);

    logger.log(`Sending ${urlcache} to be reviewed.`);

    let embed = new Discord.MessageEmbed()
        .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }), `https://saucenao.com/search.php?db=999&url=${urlcache}`)
        .addFields([{
            name: 'Rating',
            value: 'None',
            inline: true,
        }, {
            name: "Reviewer",
            value: `None`,
            inline: true,
        }])
        .setImage(`${urlcache}`)
        .setColor("#0D98BA")
        .setFooter(`© Copyright Checksum | We have ${rfs} of reviewed images in our database.`);
    await channel.send(embed).then(async (msg) => {
        await msg.react("✅");
        await msg.react("❌");
        await msg.react("⛔");
        await msg.react("❔");

        const filter = (reaction) => {
            return ["✅", "❌", "⛔", "❔"].includes(reaction.emoji.name);
        };

        msg.awaitReactions(filter, { max: 1 })
            .then(async (collected) => {
                await updateTotal(urlcache)
                const reaction = collected.first();
                const user = reaction.users.cache.last();
                const user_id = user.id;

                const result = await Users.findOne({ where: { userid: `${user_id}` } });
                if (!result) {
                    await Users.create({
                        userid: `${user_id}`,
                        count: 0,
                    });
                }

                if (reaction.emoji.name === "✅") {
                    logger.log(`The image ${urlcache} was marked as SFW`)
                    try {
                        // equivalent to: INSERT INTO tags (url, rating, user) values (?, ?, ?);
                        const image = await Images.create({
                            url: urlcache,
                            rating: 'SFW',
                            user: `${user_id}`,
                        });
                        await result.increment('count')
                        let sfwembed = new Discord.MessageEmbed()
                            .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }), `https://saucenao.com/search.php?db=999&url=${urlcache}`)
                            .setColor("GREEN")
                            .setImage(urlcache)
                            .addFields([{
                                name: "Rating",
                                value: "Safe for work.",
                                inline: true
                            }, {
                                name: "Reviewer",
                                value: `${user} (${user_id})`,
                                inline: true
                            }])
                            .setFooter(`Image ID: ${image.id}`)
                            .setTimestamp();
                        await msg.edit(sfwembed);
                        await msg.reactions.removeAll();
                        await logch.send(sfwembed)
                        return startReview(channel);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return startReview(channel);
                        }
                        return startReview(channel);
                    }
                } else if (reaction.emoji.name == "❌") {
                    logger.log(`The image ${urlcache} was marked as NSFW`)
                    try {
                        // equivalent to: INSERT INTO tags (url, rating, user) values (?, ?, ?);
                        const image = await Images.create({
                            url: urlcache,
                            rating: 'NSFW',
                            user: `${user_id}`,
                        });
                        await result.increment('count')
                        let nsfwembed = new Discord.MessageEmbed()
                            .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }), `https://saucenao.com/search.php?db=999&url=${urlcache}`)
                            .setColor("RED")
                            .setImage(urlcache)
                            .addFields([{
                                name: "Rating",
                                value: "Not safe for work.",
                                inline: true
                            }, {
                                name: "Reviewer",
                                value: `${user} (${user_id})`,
                                inline: true
                            }])
                            .setFooter(`Image ID: ${image.id}`)
                            .setTimestamp();
                        await msg.edit(nsfwembed);
                        await msg.reactions.removeAll();
                        await logch.send(nsfwembed)
                        return startReview(channel);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return startReview(channel);
                        }
                        return startReview(channel);
                    }
                } else if (reaction.emoji.name == "⛔") {
                    logger.log(`The image ${urlcache} was marked as LOLI`)
                    try {
                        // equivalent to: INSERT INTO tags (url, rating, user) values (?, ?, ?);
                        const image = await Images.create({
                            url: urlcache,
                            rating: 'LOLI',
                            user: `${user_id}`,
                        });
                        await result.increment('count')
                        let loliembed = new Discord.MessageEmbed()
                            .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }), `https://saucenao.com/search.php?db=999&url=${urlcache}`)
                            .setImage(urlcache)
                            .addFields([{
                                name: "Rating",
                                value: "Loli.",
                                inline: true
                            }, {
                                name: "Reviewer",
                                value: `${user} (${user_id})`,
                                inline: true
                            }])
                            .setColor("PURPLE")
                            .setFooter(`Image ID: ${image.id}`)
                            .setTimestamp();
                        await msg.edit(loliembed);
                        await msg.reactions.removeAll();
                        await logch.send(loliembed)
                        return startReview(channel);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return startReview(channel);
                        }
                        return startReview(channel);
                    }
                } else if (reaction.emoji.name == "❔") {
                    logger.log(`The image ${urlcache} was marked as MISC`)
                    try {
                        // equivalent to: INSERT INTO tags (url, rating, user) values (?, ?, ?);
                        const image = await Images.create({
                            url: urlcache,
                            rating: 'MISC',
                            user: `${user_id}`,
                        });
                        await result.increment('count');
                        let embed = new Discord.MessageEmbed()
                            .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }), `https://saucenao.com/search.php?db=999&url=${urlcache}`)
                            .addFields([{
                                name: 'Rating',
                                value: 'Image does not apply to classification.',
                                inline: true,
                            }, {
                                name: "Reviewer",
                                value: `${user} (${user_id})`,
                                inline: true,
                            }])
                            .setImage(`${urlcache}`)
                            .setColor("WHITE")
                            .setFooter(`Image ID: ${image.id}`)
                        await msg.edit(embed);
                        await msg.reactions.removeAll();
                        await logch.send(embed)
                        return startReview(channel);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return startReview(channel);
                        }
                        return startReview(channel);
                    }
                }
            });
    });
}

exports.startReview = startReview;