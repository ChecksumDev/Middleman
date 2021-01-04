const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const { Users } = require("../functions/database");

    let users = await Users.findAll({ limit: 10, order: [['count', 'DESC']] });
    for (const user of users) {
        await client.users.fetch(user.userid);
    }
    let embed = new MessageEmbed()
        .setAuthor("Middleman Leaderboard", `${client.user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(users.map((user, pos) => `**${pos + 1}**. ${(client.users.cache.get(user.userid).username)}: ${user.count} Points`))
        .setThumbnail('https://i.ibb.co/ByRSBmB/hp.png')
        .setColor("#d70069");
    await message.reply(embed)
}