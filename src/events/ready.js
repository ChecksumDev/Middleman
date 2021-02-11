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

module.exports = async (client) => {
    const { startReview } = require("../functions/startReview");
    const { Images, Users } = require("../functions/database");

    const logger = require("../functions/logger");
    Images.sync();
    Users.sync();
    logger.log(`${client.user.tag} (${client.user.id}) logged into the Discord API!`)
    client.user.setPresence({
        activity: {
            name: "you.",
            type: "WATCHING"
        },
    })

    client.guilds.cache.get('793034391738777670').channels.cache.forEach(async ch => {
        if (ch.name == 'review-log') return;
        if (!ch.name.startsWith("review-")) return;
        await ch.send("The bot was restarted, rebooting review process.");
        startReview(ch);
    });
}