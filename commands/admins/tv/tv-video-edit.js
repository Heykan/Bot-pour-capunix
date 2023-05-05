module.exports = {
    name: 'tv-video-edit',
    isDeletable: true,
    isAdmin: true,
    desc: `Définis le message à envoyer lors d'un upload vidéo.`,
    isEnable: true,
    execute: async (bot, message, args) => {
        const msg = args.join(' ');
        const guild = await bot.DATABASE.get('tv', 'guildId', message.guild.id);

        if (!guild) await bot.DATABASE.insert('tv', [message.guild.id, msg], ['guildId', 'youtubeMessage']);
        else await bot.DATABASE.update('tv', 'youtubeMessage', msg, 'guildId', guild.guildId);
        
        message.channel.send('Message des vidéos bien mise à jour.');
    }
}