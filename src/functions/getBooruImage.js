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

const Danbooru = require('danbooru');
const booru = new Danbooru();

async function getBooruImage() {
    let urlcache = null;
    await booru.posts({ tags: '1girl', limit: 10000 }).then(posts => {
        // Select a random post from posts array.
        const index = Math.floor(Math.random() * posts.length);
        const post = posts[index];
        urlcache = `${booru.url(post.file_url).href}`;
    });
    return urlcache;
}
exports.getBooruImage = getBooruImage;