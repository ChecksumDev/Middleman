/*
Middleman - Peer Reviewed Image API"s.
Copyright (C) 2020 ChecksumDev

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

const { search } = require('kaori');


async function getBooruImage() {
    let urlcache = null;
    let random = NaN;

    random = Math.floor(Math.random() * 101);

    if (random >= 50) {
        let images = await search('yandere', { tags: [process.env.TAGS], limit: 1, random: true, exclude: [process.env.TAGS_EXCLUDE] });
        images.map((post) => {
            urlcache = `${post.fileURL}`;
        });
        return urlcache;
    } else {
        let images = await search('danbooru', { tags: [process.env.TAGS], limit: 1, random: true, exclude: [process.env.TAGS_EXCLUDE] });
        images.map((post) => {
            urlcache = `${post.fileURL}`;
        });
        return urlcache;
    }
}
exports.getBooruImage = getBooruImage;