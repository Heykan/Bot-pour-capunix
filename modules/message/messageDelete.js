module.exports = {
    name: 'messageDelete',
    execute: async (bot, guildId, channelId, messageId) => {
        const guild = bot.guilds.cache.get(guildId);
        const channel = guild.channels.cache.get(channelId);

        const suggest = await bot.DATABASE.get('suggestions', 'messageId', messageId);

        if (suggest && channel.name == 'suggestions') await bot.DATABASE.delete('suggestions', 'messageId', messageId);
    }
}