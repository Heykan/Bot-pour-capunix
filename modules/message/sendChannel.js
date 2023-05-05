module.exports = {
    name: 'sendChannel',
    execute: async (bot, type, guildId) => {
        const channelDb = await bot.DATABASE.all('channels', 'guildId', guildId)
        if (!channelDb) return;

        const c = channelDb.find(c => c.type == type);
        if (!c) return;

        const channel = bot.channels.cache.get(c.channelId);

        return channel;
    }
}