module.exports = {
    name: 'enable-tv-night',
    isAdmin: false,
    isDeletable: true,
	desc: 'Active/désactive les notifications de la SUN TV la nuit.',
    isEnable: true,
    execute: async (bot, message, args) => {
        if (args.length < 1) return message.channel.send('Vous devez définir un paramètre on/off à la commande.').then(msg => bot.messageDelete(msg, 10));
        const guild = await bot.DATABASE.get('tv', 'guildId', message.guild.id);

        if (!guild && !guild.dayRoleId && !guild.nightRoleId) return message.channel.send('Aucun rôle n\'a encore été défini.').then(msg => bot.messageDelete(msg, 10));
        const role = message.guild.roles.cache.get(guild.nightRoleId);

        const isOn = args[0];

        switch (isOn){
            case 'on':
                if (message.member.roles.cache.get(guild.nightRoleId)) return message.reply("vous possédez déjà le rôle").then(msg => bot.messageDelete(msg, 10));
                message.member.roles.add(role);
                message.reply(`le rôle des notifications nocturne vous a été attribué.`).then(msg => bot.messageDelete(msg, 10));
                break;
            case 'off':
                if (!message.member.roles.cache.get(guild.nightRoleId)) return message.reply("vous ne possédez déjà pas le rôle").then(msg => bot.messageDelete(msg, 10));
                message.member.roles.remove(role);
                message.reply(`le rôle des notifications nocturne vous a été retiré.`).then(msg => bot.messageDelete(msg, 10));
                break;
            default:
                return message.reply("C'est comme un intterupteur soit off, soit on. (╬▔皿▔)╯").then(msg => bot.messageDelete(msg, 10));
        }
    }
}