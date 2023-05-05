module.exports = {
    name: 'updateUserMessage',
    execute: async (bot, message) => {
        let user = await bot.DATABASE.get("user", "userId", message.author.id);

        if (!user) {
            return await bot.DATABASE.insert("user", [message.author.id, 1, 0, 1, 0, 1, null, null, null, 0]); 
        }
        
        await bot.DATABASE.update("user", "messageCount", user.messageCount + 1, "userId", user.userId);

        if (bot.messageCD.has(message.author.id)) return;
        bot.messageCD.set(message.author.id);
        
        if (!bot.GAME_CHANNEL.includes(message.channel.name)) bot.modules.get('updateUserExp').execute(bot, message, user, 1);

        setTimeout(() => {
            bot.messageCD.delete(message.author.id);
        }, 60000);
    }
}
