module.exports = {
    name: "count-stop",
    isAdmin: true,
    desc: 'Arrête le jeu de 1 en 1. !count-stop une raison optionnel.',
    isEnable: true,
    execute: (bot, message, args) => {
      let game = "countGame";

      if (!bot.minigames.get(game).gameStart) return message.channel.send(`Le jeu n'est pas lancer impossible de l'arrêter ! (╯°□°）╯︵ ┻━┻)`).then(msg => bot.messageDelete(msg, 10));
      bot.minigames.get(game).gameStart = false;
      message.channel.bulkDelete(100, true);
      let reason = args.length > 0 ? args.map(value => `${value}`).join(" ") : null;    
      reason ? message.channel.send(`Le jeu à été arrêter par <@${message.author.id}> pour la rasion suivante : ${reason}`) : message.channel.send(`Le jeu à été arrêter par <@${message.author.id}>`);
  }
}