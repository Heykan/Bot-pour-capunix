const fs = require('fs');

module.exports = {
    name: 'fileExist',
    execute: async (path) => {
        return await fs.existsSync(path);
    }
}