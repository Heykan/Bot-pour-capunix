const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "editSuggest",
    execute: async (bot, message, args) => {
        if (args[0] <= 0) return message.channel.send("Pour changer l'état d'une suggestion merci de renseigner un id correct. ಥ_ಥ").then(msg => bot.messageDelete(msg, 4));
        const idSuggest = args[0];
        const suggestion = await bot.DATABASE.get("suggestions", "idSuggestion", idSuggest);
        if (suggestion == null) return message.channel.send("Cet id n'existe pas. ಥ_ಥ").then(msg => bot.messageDelete(msg, 4));

        const etat = args[1];
        const raison = args.slice(2).join(" ");
        if (!raison && !(etat == 3 || etat == "att")) return message.channel.send("Les raisons sont obligatoire pour tous les états, sauf en attente !").then(msg => bot.messageDelete(msg, 4));

        if (suggestion.etat == 2 || suggestion.etat == 5) return message.channel.send("Impossible de modifier la suggestion dans son état actuel !").then(msg => bot.messageDelete(msg, 4));
        
        const member = await message.guild.members.cache.get(suggestion.authorId);
        const channel = await bot.channels.cache.get(suggestion.channelId);
        let msgEmbed;
        await channel.messages.fetch(suggestion.messageId).then(async (msg) => { 
            msgEmbed = await msg;
        });

        let color, etatText;

        switch (etat) {
            case "default":
            case "1":
                etatText = "Défaut";
                await bot.DATABASE.update("suggestions", "etat", 1, "idSuggestion", idSuggest);
                color = bot.COLOR.GRAY;
                break;
            case "no":
            case "2":
                etatText = "Rejetter";
                await bot.DATABASE.update("suggestions", "etat", 2, "idSuggestion", idSuggest);
                color = bot.COLOR.RED;
                break;
            case "att":
            case "3":
                etatText = "En attente";
                await bot.DATABASE.update("suggestions", "etat", 3, "idSuggestion", idSuggest);
                color = bot.COLOR.BLUE;
                break;
            case "progress":
            case "4":
                etatText = "En cours";
                await bot.DATABASE.update("suggestions", "etat", 4, "idSuggestion", idSuggest);
                color = bot.COLOR.PURPLE;
                break;
            case "ok":
            case "5":
                etatText = "Valider";
                await bot.DATABASE.update("suggestions",  "etat", 4, "idSuggestion", idSuggest);
                color = bot.COLOR.GREEN;
                break;
            default:
                return message.channel.send(`Il faut voir un docteur, je ne connais pas cet état. .·´¯\\\`(>▂<)´¯\\\`·. `).then(msg => bot.messageDelete(msg, 4));
        }
        
        if (raison) message.channel.send(`Mise à jour de l'état en **${etatText}** pour la raison suivante : ${raison}.`).then(msg => bot.messageDelete(msg, 10));
        else message.channel.send(`Mise à jour de l'état en **${etatText}**.`).then(msg => bot.messageDelete(msg, 10));

        const embed = msgEmbed.embeds[0];
        embed.setColor(color);
        embed.setTimestamp();

        if (raison) embed.fields[0] = {
          name: "Raison du changement d'état",
          value: raison
        }
    
        msgEmbed.edit(embed);

        let userDb = await bot.DATABASE.get("user", "userId", member.id);
        if (!Boolean(userDb.isMp)) return;

        raison ? member.send(`Votre suggestion #${idSuggest} est passer à l'état : **${etatText}** pour la raison suivante : ${raison}`) : member.send(`Votre suggestion #${idSuggest} est passer à l'état : **${etatText}**`);
        member.send(embed);
    }
}