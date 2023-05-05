module.exports = {
    name: "message",
    execute: async (bot, message) => {
        if (message.author.bot || !message.guild) return;
        if (!message.content.startsWith(bot.prefix)) {
            
            bot.minigames.forEach(game => {
                if (game.gameStart) game.execute(bot, message);      
            });

            bot.modules.get('updateUserMessage').execute(bot, message);
            
            return;
        }

        const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = bot.commands.get(command) || bot.commands.find(c => c.aliases && c.aliases.includes(command));
        if (!cmd) return;

        if (!cmd.isEnable) return;
        
        const isAdmin = bot.modules.get('isAdmin').execute(bot, message);
        if (cmd.isAdmin && !isAdmin) return message.channel.send("Tu n'as pas les droits requis pour cette commande, mais ne désespére pas ! Un jour peut-être qui sait ! d=====(￣▽￣*)b");
        if (cmd.isDeletable) await message.delete();
        cmd.execute(bot, message, args)
    }
}