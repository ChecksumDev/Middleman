/*
Middleman - Peer Reviewed Image API"s.
Copyright (C) 2020 CollierDevs

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
const { Images } = require('./database');
const logger = require("./logger");


// Image APIs
const Nekos = require('nekos.life');
const nekos = new Nekos();
const Danbooru = require('danbooru')
const booru = new Danbooru('danbooru.me')

async function getNeko() {
    // // Generate a random number cause I suck at coding.
    // let random = Math.floor(Math.random() * 100)

    // if (random >= 50) { // If greater than 50
    //     let img = await nekos.nsfw.hentai(); // Generate nsfw-classified neko.
    //     return img.url;
    // } else if (random <= 50) { // If less than 50
    //     let img = await nekos.sfw.neko(); // Generate sfw-classified neko.
    //     return img.url;
    // }
}
async function sendImage(message) {
    let urlcache = null;
    await booru.posts({ tags: '1girl', limit: 10000 }).then(posts => {
        // Select a random post from posts array
        const index = Math.floor(Math.random() * posts.length)
        const post = posts[index]
        urlcache = `${booru.url(post.file_url).href}`;
    })

    if (urlcache == 'https://danbooru.donmai.us/') return sendImage(message);

    const result = await Images.findOne({ where: { url: urlcache } });
    if (result) {
        logger.log(`Skipping ${urlcache} | Image already reviewed.`)
        return sendImage(message);
    }

    let embed = new Discord.MessageEmbed()
        .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
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
        .setColor("YELLOW")
        .setFooter("© Copyright CollierDevs 2020");
    await message.channel.send(embed).then(async (msg) => {
        await msg.react("✅");
        await msg.react("❌");
        await msg.react("⛔");
        await msg.react("➡️");

        const filter = (reaction) => {
            return ["✅", "❌", "⛔", "➡️"].includes(reaction.emoji.name);
        };

        msg.awaitReactions(filter, { max: 1 })
            .then(async (collected) => {
                const reaction = collected.first();

                if (reaction.emoji.name === "✅") {
                    logger.log(`${urlcache} was marked as SFW by ${reaction.users.cache.last().tag} (${reaction.users.cache.last().id}).`)
                    try {
                        // equivalent to: INSERT INTO tags (url, rating, author) values (?, ?, ?);
                        const image = await Images.create({
                            url: urlcache,
                            rating: 'SFW',
                            author: `${reaction.users.cache.last().id}`,
                        });
                        let sfwembed = new Discord.MessageEmbed()
                            .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
                            .setColor("GREEN")
                            .setImage(urlcache)
                            .addFields([{
                                name: "Rating",
                                value: "Safe for work.",
                                inline: true
                            }, {
                                name: "Reviewer",
                                value: `${reaction.users.cache.last()} (${reaction.users.cache.last().id})`,
                                inline: true
                            }])
                            .setFooter(`Image ID: ${image.get('id')}`)
                            .setTimestamp();
                        await msg.reactions.removeAll();
                        await msg.edit(sfwembed);
                        await msg.reactions.removeAll();
                        client.channels.cache.get('793726527744245780').send(sfwembed)
                        return sendImage(message);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return sendImage(message);
                        }
                        return sendImage(message);
                    }
                } else if (reaction.emoji.name == "❌") {
                    logger.log(`${urlcache} was marked as NSFW by ${reaction.users.cache.last().tag} (${reaction.users.cache.last().id}).`)
                    try {
                        // equivalent to: INSERT INTO tags (url, rating, author) values (?, ?, ?);
                        const image = await Images.create({
                            url: urlcache,
                            rating: 'NSFW',
                            author: `${reaction.users.cache.last().id}`,
                        });
                        let nsfwembed = new Discord.MessageEmbed()
                            .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
                            .setColor("RED")
                            .setImage(urlcache)
                            .addFields([{
                                name: "Rating",
                                value: "Not safe for work.",
                                inline: true
                            }, {
                                name: "Reviewer",
                                value: `${reaction.users.cache.last()} (${reaction.users.cache.last().id})`,
                                inline: true
                            }])
                            .setFooter(`Image ID: ${image.get('id')}`)
                            .setTimestamp();
                        await msg.reactions.removeAll();
                        await msg.edit(nsfwembed);
                        await msg.reactions.removeAll();
                        client.channels.cache.get('793726527744245780').send(nsfwembed)
                        return sendImage(message);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return sendImage(message);
                        }
                        return sendImage(message);
                    }
                } else if (reaction.emoji.name == "⛔") {
                    logger.log(`${urlcache} was marked as LOLI by ${reaction.users.cache.last().tag} (${reaction.users.cache.last().id}).`)
                    try {
                        // equivalent to: INSERT INTO tags (url, rating, author) values (?, ?, ?);
                        const image = await Images.create({
                            url: urlcache,
                            rating: 'LOLI',
                            author: `${reaction.users.cache.last().id}`,
                        });
                        let loliembed = new Discord.MessageEmbed()
                            .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
                            .setImage(urlcache)
                            .addFields([{
                                name: "Rating",
                                value: "Loli.",
                                inline: true
                            }, {
                                name: "Reviewer",
                                value: `${reaction.users.cache.last()} (${reaction.users.cache.last().id})`,
                                inline: true
                            }])
                            .setColor("PURPLE")
                            .setFooter(`Image ID: ${image.get('id')}`)
                            .setTimestamp();
                        await msg.reactions.removeAll();
                        await msg.edit(loliembed);
                        await msg.reactions.removeAll();
                        client.channels.cache.get('793726527744245780').send(loliembed)
                        return sendImage(message);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return sendImage(message);
                        }
                        return sendImage(message);
                    }
                } else if (reaction.emoji.name == "➡️") {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
                        .addFields([{
                            name: 'Rating',
                            value: 'Skipped',
                            inline: true,
                        }, {
                            name: "Reviewer",
                            value: `Skipped`,
                            inline: true,
                        }])
                        .setImage(`${urlcache}`)
                        .setColor("BLUE")
                        .setFooter("© Copyright CollierDevs 2020");
                    await msg.reactions.removeAll();
                    await msg.edit(embed);
                    await msg.reactions.removeAll();
                    return sendImage(message);
                }
            });
    });
}
exports.sendImage = sendImage;
