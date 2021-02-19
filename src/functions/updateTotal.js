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

const request = require("request");
const { log } = require("./logger");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const jsondb = low(adapter)
const filesize = require("filesize");

async function updateTotal(url) {
    await request({ url: `${url}`, method: "HEAD" }, async function (err, response, body) {
        if (err) return 0;
        let len = response.headers['content-length'];
        log(`${url} is ${filesize(len)}`);
        await jsondb.update('total', n => parseInt(n) + parseInt(len)).write();
        return;
    });
};

exports.updateTotal = updateTotal;