module.exports = {
  name: "suggest",
  isAdmin: false,
  isDeletable: true,
  desc: 'Pour faire une suggestion sur le serveur. !suggest Votre suggestion.',
  isEnable: true,
  execute: async (bot, message, args) => {
    if (args.length == 0) return message.channel.send("Merci de renseigner un message de suggestion.").then(msg => bot.messageDelete(msg, 5));

    // Check admin for roles
    const isAdmin = bot.modules.get('isAdmin').execute(bot, message);
    
    const add = bot.modules.get("addSugest");
    const edit = bot.modules.get("editSuggest");

    if (isNaN(args[0])) return add.execute(bot, message, args);

    if (!isAdmin) return message.channel.send("Tu n'as pas les droits requis pour cette commande, mais ne désespére pas ! Un jour peut-être qui sait ! d=====(￣▽￣*)b").then(msg => bot.messageDelete(msg, 10));
    edit.execute(bot, message, args);
  }
}