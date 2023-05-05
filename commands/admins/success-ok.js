const { MessageAttachment } = require("discord.js")

module.exports = {
    name: "success-ok",
    aliases: [],
    isAdmin: true,
    isDeletable: true,
    desc: 'Valide le succès d\'un membre, veuillez écrire la commande sous la forme suivante : !success-ok @[user] [id].',
    isEnable: false,
    execute: async (bot, message, args) => {
        if (args.length < 2) return message.channel.send("Argument invalide, veuillez ré-écrire la commande sous la forme suivante : !success-ok @[user] [id].").then(msg => bot.messageDelete(msg, 60));
        const user = message.mentions.users.first();
        const id = args[1];

        const channel = message.guild.channels.cache.find(c => c.type == "text" && c.name.toLowerCase() == "général")

        const userDb = await bot.DATABASE.get("user", "userId", user.id);
        const successDb = await bot.DATABASE.get("success", "id", id);

        if (!successDb) return message.channel.send(`Le succès #${id} n'existe pas.`);

        const contains = userDb.success.split(',').includes(id);
        if (contains) return message.channel.send(`<@${user.id}>, possède déjà le succès #${id}.`);

        let success;
        userDb.success ? success = `${userDb.success},${id}` : success = id;

        const update = await bot.DATABASE.update("user", "success", success, "userId", user.id);
        const attachment = new MessageAttachment(successDb.iconUrl);
        update ? channel.send(`<@${user.id}>, Le succès #${id} vous a été accordé.`, attachment) : message.channel.send(`Impossible d'attribuer le succès #${id} à <@${user.id}>.`);
    }
}