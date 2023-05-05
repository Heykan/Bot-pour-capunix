module.exports = {
    name: 'tv-notif-role-nuit-edit',
    isDeletable: true,
    isAdmin: true,
    desc: `Définis le rôle qui sera notifier la nuit.`,
    aliases: ['rn'],
    isEnable: true,
    execute: async (bot, message, args) => {
        const role = message.mentions.roles.first();

        if (!role) return message.channel.send('Ce rôle ne renvoie rien.').then(msg => bot.messageDelete(msg, 5));

        const guild = await bot.DATABASE.get('tv', 'guildId', message.guild.id);

        if (!guild) await bot.DATABASE.insert('tv', [message.guild.id, role.id], ['guildId', 'nightRoleId']);
        else await bot.DATABASE.update('tv', 'nightRoleId', role.id, 'guildId', guild.guildId);

        message.channel.send('Role des notifications nocturne de live mise à jour.').then(msg => bot.messageDelete(msg, 5)); 
    }
}