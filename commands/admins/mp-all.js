module.exports = {
  name: "mp-all",
  aliases: [],
  isAdmin: true,
  desc: 'Envoi un mp à tout le monde.',
  isEnable: true,
  execute: async (bot, message, args) => {
    if (!args.join(" ")) return message.reply("veuillez saisir un message à envoyer.").then(msg => bot.messageDelete(msg, 10));
    await message.guild.members.fetch().then(member => {
      // Il faudrait ici check si l'ID du membre (member.user.id) est dans la DB, mais vu que je connais pas le nom de la DB bah...
      member.each(m => m.send(args.join(" ")).catch(() => console.log(`Le message n'a pas pu être envoyé à ${m.user.tag}.`)));
    });
  }
}
