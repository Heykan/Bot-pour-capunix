module.exports = {
    name: "mp",
    aliases: [],
    isAdmin: false,
    isDeletable: true,
    desc : 'Active/Désactive les mp du bot avec l\'argument on/off.',
    isEnable: true,
    execute: async (bot, message, args) => {
        if (args.length < 1) return message.reply("Merci de préciser si c'est on ou off. (●'◡'●)").then(msg => bot.messageDelete(msg, 10));
        const arg = args.shift();
        const user = await bot.DATABASE.get("user", "userId", message.author.id);

        if (!user) await bot.DATABASE.insert("user", [member.user.id, 1, 0, 0, 0, 1]);

        switch(arg) {
            case "off":
            case 0:
                await bot.DATABASE.update("user", "isMp", 0, "userId", message.author.id);
                message.reply("Tu ne recevras plus de mp de la part de ce bot.").then(msg => bot.messageDelete(msg, 10));
                break;
            case "on":
            case 1:
                await bot.DATABASE.update("user", "isMp", 1, "userId", message.author.id);
                message.reply("Tu as réactiver les mps du bot.").then(msg => bot.messageDelete(msg, 10));
                break;
            default:
                message.reply("C'est comme un interrupteur soit on, soit off. Choisis l'un des deux. (╬▔皿▔)╯").then(msg => bot.messageDelete(msg, 10));
                break;
        }
    }
}


