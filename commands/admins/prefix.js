module.exports = {
    name: 'prefix',
    isAdmin: true,
    aliases: [],
    desc: 'Modifie le préfix du bot',
    isEnable: true,
    execute : async (bot, message, args) => {
        if (args.length < 1) return message.channel.send('merci de définir un préfix pour le bot');

        let success = await bot.DATABASE.update('config', 'prefix', args[0], 'id', '1');
        if (!success) return message.channel.send('Erreur lors de la mise à jour du prefix');
	message.channel.send('Prefix mis à jour');
   	bot.prefix = args[0]; 
   }
}
