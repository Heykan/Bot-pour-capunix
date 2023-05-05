const fs = require('fs');

module.exports = {
    name: 'deleteFile',
    execute: (path) => {
        if (bot.modules.get("fileExist").execute(path))
            fs.unlink(path, err => {
                if (err)
                    return console.log(err);
            });

    }
}