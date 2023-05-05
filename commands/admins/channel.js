module.exports = {
    name: 'channel',
    isAdmin: true,
    isDeletable: true,
    desc: 'Définis un salon dans un type pour les messages automatique. (RÉSERVER AUX DEV !!).',
    isEnable: true,
    execute: async (bot, message, args) => {
        if (args.length < 1) return message.channel.send('Il me faut au moins le type du salon pour l\'ajout à la BDD.').then(msg => bot.messageDelete(msg, 5));
        const type = args[0];

        if (!isNaN(type)) return message.channel.send('Le type ne peut pas être un nombre.').then(msg => bot.messageDelete(msg, 5));

        const channel = await bot.DATABASE.get("channels", "channelId", message.channel.id);

        if (channel) await bot.DATABASE.update("channels", "type", type, "channelId", message.channel.id);
        else await bot.DATABASE.insert("channels", [message.channel.id, message.guild.id, type]);

        message.channel.send(`Ce salon est bien configurer en tant que : **${type}**`).then(msg => bot.messageDelete(msg, 5));
    }
}