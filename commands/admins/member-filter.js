const fs = require('fs'), path = require('path');

module.exports = {
    name: 'member-filter',
    isAdmin: true,
    isDeletable: true,
    aliases: [],
    desc: 'Tri les membres fantôme',
    isEnable: true,
    execute: async (bot, message, args) => {
        let guilds = bot.guilds.cache;

        guilds.forEach(async guild => {
            let users = '';
            await guild.members.fetch().then(g => {
                g.forEach(member => {
                    if (!member.user.bot)
                        users += `${member.user.username}#${member.user.discriminator}\n`;
                });

                let pathFile = `logs/${guild.id}.txt`;
                let dirname = path.dirname(pathFile);
                if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);

                fs.writeFileSync(pathFile, users);

                console.log('File saved');

                message.member.send(`Liste des fantome pour ${guild.name} :`, {
                    files: [{
                        attachment: pathFile,
                        name: `${guild.id}.txt`
                        }]
                })
                .then(console.log(`File '${pathFile}' send to lord`))
                .catch(console.error("Can't send file to Lord"));
            });
        });
    }
}