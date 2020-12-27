/*
Middleman - Peer Reviewed Image API's.
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

require('dotenv').config();
const logger = require('./functions/logger');

const Discord = require('discord.js')
const client = new Discord.Client()

client.on("ready", () => {
    logger.log(`${client.user.tag} (${client.user.id}) logged into the Discord API!`)
});

client.login();