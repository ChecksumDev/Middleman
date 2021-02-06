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

// Static Deps
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const logger = require("./functions/logger");

// Main Deps
const Enmap = require("enmap");
const Discord = require("discord.js");
const client = new Discord.Client();
exports.client = client;

fs.readdir(path.join(__dirname, '/events/'), (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(path.join(__dirname, `/events/${file}`));
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir(path.join(__dirname, '/commands/'), (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(path.join(__dirname, `/commands/${file}`));
        let commandName = file.split(".")[0];
        logger.log(`Loaded command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

client.login();