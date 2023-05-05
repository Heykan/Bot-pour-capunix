const { Collection } = require("discord.js");
const { readdirSync, statSync } = require("fs");
const path = require('path');

function getFiles(bot, folder, method){
    for (const file of readdirSync(folder)){
        const stat = statSync(`${folder}/${file}`)
        if (stat && stat.isDirectory()) getFiles(bot, `${folder}/${file}`, method);
        else{
            if (file.endsWith(".js")){
                const command = require(`${folder}/${file}`);

                if (method == "COMMAND"){
                    bot.commands.set(command.name, command);
                }
                else if (method == "EVENT"){
                    bot.on(command.name, command.execute.bind(null, bot));
                }
                else if (method == "MINIGAME"){
                    bot.minigames.set(command.name, command);
                }
                else if (method == "MODULE"){
                    bot.modules.set(command.name, command);
                }
                var filename = path.resolve(`${folder}/${file}`);
                delete require.cache[filename];
            }
        }
    }
}

module.exports = {
    loadCommands: (bot) => {
        bot.commands = new Collection();
        getFiles(bot, "./commands", "COMMAND")
    },
    loadEvents: (bot) => {
        getFiles(bot, "./events", "EVENT")
    },
    loadMinigames: (bot) => {
        bot.minigames = new Collection();
        getFiles(bot, "./minigames", "MINIGAME");
    },  
    loadModules: (bot) => {
        bot.modules = new Collection();
        getFiles(bot, "./modules", "MODULE");
    }
}