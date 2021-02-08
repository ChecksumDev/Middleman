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

exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const { Users } = require("../functions/database");
  
  if (!args[0]) return message.reply("Please mention a user!");

  const user = await Users.findOne({
    where: {
      userid: message.mentions.users.first().id,
    },
  });
  if (!user)
    return message.reply("That user has never reviewed for Middleman.");

  let embed = new Discord.MessageEmbed()
    .setAuthor(
      `${message.mentions.users.first().tag}`,
      message.mentions.users.first().displayAvatarURL({
        dynamic: true,
      })
    )
    .addFields([
      {
        name: "Balance",
        value: `${user.get("count")}`,
      },
      {
        name: "Last active",
        value: `${user.get("updatedAt")}`,
      },
    ])
    .setColor("BLUE");
  await message.reply(embed);
};
