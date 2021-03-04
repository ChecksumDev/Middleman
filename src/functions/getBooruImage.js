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
const Booru = require('booru');

async function getBooruImage() {
    let urlcache = null;
    let args = [process.env.TAGS];

    let searchsites = ["kc", "kn", "yd", "db"];
    let site = searchsites[Math.floor(Math.random() * searchsites.length)];
    async function searchRandom(site) {
        await Booru.search(`${site}`, args, { limit: 1, random: true, nsfw: true })
            .then(async posts => {
                for (let post of posts)
                urlcache = post.fileUrl;
            })
        return urlcache;
    }
    return await searchRandom(site);
}

exports.getBooruImage = getBooruImage;