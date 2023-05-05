module.exports = {
    name: "success-no",
    aliases: ["sn"],
    isAdmin: true,
    isDeletable: true,
    desc: 'Refuse un succès à un membre, veuillez écrire la commande sous la forme suivante : !success-no @[user] [id] [raison].',
    isEnable: false,
    execute: async (bot, message, args) => {
        if (args.length < 3) return message.channel.send("Argument invalide, veuillez ré-écrire la commande sous la forme suivante : !success-no @[user] [id] [raison].").then(msg => bot.messageDelete(msg, 60));
        console.log(args[0]);
        const user = message.mentions.users.first();
        const id = args[1];
        const raison = args.slice(2).join(" ");

        const channel = message.guild.channels.cache.find(c => c.type == "text" && c.name.toLowerCase() == "général")
        channel.send(`<@${user.id}>, Le succès #${id} vous a été refusé pour la raison suivante : ${raison}`);
    }
}