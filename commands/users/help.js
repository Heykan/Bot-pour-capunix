module.exports = {
    name: 'help',
    desc: 'Affiche cette liste.',
    isDeletable: true,
    isEnable: true,
    execute: async (bot, message) => {
        let text = '';
        let textAdmin = '';

        const isAdmin = bot.modules.get('isAdmin').execute(bot, message);
        
        const channelAdmin = await bot.modules.get('sendChannel').execute(bot, 'admin', message.guild.id);

        bot.commands.forEach(command => {
            if (command.isAdmin) return textAdmin += `${bot.prefix}${command.name} - ${command.desc ? command.desc : 'Aucune information disponible.'}\n`;
            if (command.isEnable)
                text += `${bot.prefix}${command.name} - ${command.desc ? command.desc : 'Aucune information disponible.'}\n`;
        });

        message.channel.send(`\`\`\`fix\nListe des commandes disponibles :\n${text}\`\`\``);
        if (isAdmin && channelAdmin)
            channelAdmin.send(`\`\`\`fix\nListe des commandes admin disponibles :\n${textAdmin}\`\`\``);
    }
}
