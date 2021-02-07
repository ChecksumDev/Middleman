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

const {
    search
} = require('kaori');


async function getBooruImage() {
    let urlcache = null;

    let searchsites = ["yandere", "danbooru", "konachan", "konachannet"];
    let site = searchsites[Math.floor(Math.random() * searchsites.length)];
    async function searchRandom(site) {
        let images = await search(`${site}`, {
            tags: [process.env.TAGS],
            limit: 1,
            random: true,
            exclude: [process.env.TAGS_EXCLUDE]
        });
        images.map((post) => {
            urlcache = `${post.fileURL}`;
        });
        return urlcache;
    }
    return await searchRandom(site);
}

exports.getBooruImage = getBooruImage;