const fs = require("fs");
const request = require("request");

module.exports = {
    name: "download",
    execute: async (bot, url, filename, callback) => {
        request.head(url, (err, res, body) => {
            request(url)
            .pipe(fs.createWriteStream(filename))
            .on('close', callback);
        });
    }
}