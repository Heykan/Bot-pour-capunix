module.exports = {
    name: "count-config",
    aliases: [],
    isAdmin: true,
    desc: 'Permet de configurer le jeu de 1 en 1. !count-config palier/max/min votre_valeur.',
    isEnable: true,
    execute: (bot, message, args) => {
        let game = "countGame";

        if (args.length <= 1){
            message.reply(`Donne moi au moins un paramètre et sa valeur ! En tant que bot je ne lis pas dans ton esprit ! (┬┬﹏┬┬)`).then(msg => bot.messageDelete(msg, 10));
            return;
        }

        let conf = args.shift().toLowerCase();
        let value = args.shift().toLowerCase();

        if (bot.minigames.get(game).gameStart){
            message.channel.bulkDelete(1, true);
            message.reply(`Partie en cours, impossible de modifier les valeurs`).then(msg => bot.messageDelete(msg, 5));
            return;
        }
            switch (conf){
                case "palier":
                    bot.minigames.get(game).palierLimit = parseInt(value);
                    message.reply(`Palier de sauvegarde tous les ${bot.minigames.get(game).palierLimit}`).then(msg => bot.messageDelete(msg, 10));
                break;

                case "max":
                    bot.minigames.get(game).objectiveMax = parseInt(value);
                    message.reply(`Le nombre maximum est réglé à ${bot.minigames.get(game).objectiveMax}`).then(msg => bot.messageDelete(msg, 10));
                break;

                case "min":
                    bot.minigames.get(game).objectiveMin = parseInt(value);
                    message.reply(`Le nombre minimum est réglé à ${bot.minigames.get(game).objectiveMin}`).then(msg => bot.messageDelete(msg, 10));
                break;

                default:
                    message.reply(`Tu ne serais pas Einstein a inventé de nouveaux paramètres ?! (⊙_⊙;)`).then(msg => bot.messageDelete(msg, 10));
                break;
            }
  }
}