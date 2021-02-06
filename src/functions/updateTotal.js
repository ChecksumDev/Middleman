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