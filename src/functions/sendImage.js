const Discord = require("discord.js");
const { client } = require("../main");
const { Images } = require('./database');
const logger = require("./logger");

const Nekos = require('nekos.life');
const nekos = new Nekos();

async function getNeko() {

    // Generate a random number cause I suck at coding.
    let random = Math.floor(Math.random() * 100)

    if (random >= 50) {
        let img = await nekos.nsfw.neko();
        return img.url;
    } else {
        let img = await nekos.sfw.neko();
        return img.url;
    }
}
async function sendImage(message) {
    let url = await getNeko();
    let urlcache = url;

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
            name: 'Author',
            value: `None`,
            inline: true,
        }])
        .setImage(`${url}`)
        .setColor("YELLOW")
        .setFooter("© Copyright CollierDevs 2020");
    await message.channel.send(embed).then(async (msg) => {
        await msg.react("✅");
        await msg.react("🔞");
        await msg.react("⛔");
        await msg.react("➡️");

        const filter = (reaction) => {
            return ["✅", "🔞", "⛔", "➡️"].includes(reaction.emoji.name);
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
                                name: "Author",
                                value: `${reaction.users.cache.last().tag} (${reaction.users.cache.last().id})`,
                                inline: true
                            }])
                            .setFooter(`Image ID: ${image.get('id')}`)
                            .setTimestamp();
                        await msg.reactions.removeAll();
                        await msg.edit(sfwembed);
                        await msg.reactions.removeAll();
                        return sendImage(message);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return message.channel.send('Something seirously wrong has occured, please contact Jeztec.\nThis error should be impossible to produce.');
                        }
                        return message.channel.send('Something seirously wrong has occured, please contact Jeztec.\nThis error should be impossible to produce.');
                    }
                } else if (reaction.emoji.name == "🔞") {
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
                                name: "Author",
                                value: `${reaction.users.cache.last().tag} (${reaction.users.cache.last().id})`,
                                inline: true
                            }])
                            .setFooter(`Image ID: ${image.get('id')}`)
                            .setTimestamp();
                        await msg.reactions.removeAll();
                        await msg.edit(nsfwembed);
                        await msg.reactions.removeAll();
                        return sendImage(message);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return message.channel.send('Something seirously wrong has occured, please contact Jeztec.\nThis error should be impossible to produce.');
                        }
                        return message.channel.send('Something seirously wrong has occured, please contact Jeztec.\nThis error should be impossible to produce.');
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
                                name: "Author",
                                value: `${reaction.users.cache.last().tag} (${reaction.users.cache.last().id})`,
                                inline: true
                            }])
                            .setColor("PURPLE")
                            .setFooter(`Image ID: ${image.get('id')}`)
                            .setTimestamp();
                        await msg.reactions.removeAll();
                        await msg.edit(loliembed);
                        await msg.reactions.removeAll();
                        return sendImage(message);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return message.channel.send('Something seirously wrong has occured, please contact Jeztec.\nThis error should be impossible to produce.');
                        }
                        return message.channel.send('Something seirously wrong has occured, please contact Jeztec.\nThis error should be impossible to produce.');
                    }
                } else if (reaction.emoji.name == "➡️") {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Middleman", client.user.displayAvatarURL({ dynamic: true }))
                        .addFields([{
                            name: 'Rating',
                            value: 'Skipped',
                            inline: true,
                        }, {
                            name: 'Author',
                            value: `Skipped`,
                            inline: true,
                        }])
                        .setImage(`${url}`)
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
