module.exports = {
  name: "purge",
  aliases: [],
  isAdmin: true,
  isDeletable : true,
  desc: 'Permet de supprimer 1 à 100 messages en fonction de l\'argument. !purge 1-100.',
  isEnable: true,
  execute: (bot, message, args) => {
      if (args.length < 1) return message.channel.bulkDelete(100, true);
      const quantity = parseInt(args.shift());

      if (isNaN(quantity) || quantity > 100) return message.channel.bulkDelete(100, true);
      message.channel.bulkDelete(quantity, true);
  }
}