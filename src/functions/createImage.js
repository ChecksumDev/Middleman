const { Images } = require('./database');

async function createImage(urlcache, user_id, rating) {
    return await Images.create({
        url: urlcache,
        rating: `${rating}`,
        user: `${user_id}`,
    });
}
exports.createImage = createImage;
