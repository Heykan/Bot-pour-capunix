module.exports = {
    name: "success-reclame",
    aliases: ["sr", "success"],
    isAdmin: false,
    isDeletable: false,
    desc: 'Envoie une requête de succès au staff qui valideront ou non, veuillez l\'écrire sous la forme suivante : !success-reclame idsuccess raison:texte/image.',
    isEnable: true,
    execute: async (bot, message, args) => {
        if (args.length < 1 && message.attachments.size < 1) return message.reply("Je n'ai pas compris la demande, elle doit être sous la forme suivante : !success-reclame idsuccess raison:texte/image").then(msg => bot.messageDelete(msg, 10));

        const channel = await bot.modules.get('sendChannel').execute(bot, 'success', message.guild.id);
        if (!channel) return message.channel.send(`L'administrateur n'a pas défini de canal pour les suggestions.`);
        
        const id = args.shift();
        const raisonText = args.length > 0 ? args.join(" ") : null;
        const raisonImage =  message.attachments.size > 0 ? message.attachments.array() : null;

        let text = raisonText ? `<@${message.author.id}> à demande le succès #${id} pour la raison : ${raisonText}` : `<@${message.author.id}> à demande le succès #${id}`;

        raisonImage ? channel.send(text, raisonImage[0]) : channel.send(text);
    }
}