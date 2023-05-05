module.exports = {
    name: "count-start",
    aliases: [],
    isAdmin: true,
    desc: 'Démarre le jeu de 1 en 1.',
    isEnable: true,
    execute: async (bot, message, args) => {
      const game = "countGame";
      const channel = await bot.modules.get('sendChannel').execute(bot, '1b1', message.guild.id);

      if (bot.minigames.get(game).gameStart) return message.channel.send("Le jeu est déjà lancé, merci de terminer votre partie ou d'ulitiser la commande !count-stop [optionnel: raison]").then(msg => bot.messageDelete(msg, 5));

      bot.minigames.get(game).channel = channel.id;
      bot.minigames.get(game).gameStart = true;

      let max = Math.floor(Math.random() * (bot.minigames.get(game).objectiveMax - bot.minigames.get(game).objectiveMin)) + bot.minigames.get(game).objectiveMin;
      bot.minigames.get(game).objective = max;
      
      message.channel.bulkDelete(100, true);
      message.channel.send(`Début de la partie ! On vise le nombre : ${bot.minigames.get(game).objective}`);
  }
}