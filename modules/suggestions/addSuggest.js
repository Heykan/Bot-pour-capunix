const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addSugest",
  isAdmin: false,
  execute: async (bot, message, args) => {
    const value = args.join(" "); 
    
    if (value.length < 15) return message.channel.send("Merci de renseigner en un minimum de 15 caractères.").then(msg => bot.messageDelete(msg, 5));
        
    const lastSuggestion = await bot.DATABASE.last("suggestions", "idSuggestion");
    const id = lastSuggestion ? lastSuggestion.idSuggestion + 1 : 1;

    const embed = new MessageEmbed()
      .setColor(bot.COLOR.GRAY)
      .setTitle(`Suggestion #${id}`)
      .setAuthor(message.author.username)
      .setDescription(value)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("SUN™BOT", bot.user.displayAvatarURL());
    
    const channel = await bot.modules.get('sendChannel').execute(bot, 'suggests', message.guild.id);
    if (!channel) return message.channel.send(`L'administrateur n'a pas défini de canal pour les suggestions.`);

    const msg = await channel.send(embed);
    for (const emoji of ['👍', '👎']) msg.react(emoji);

    await bot.DATABASE.insert("suggestions", [id, 0, message.author.id, msg.id, channel.id, value], ["idSuggestion", "etat", "authorId", "messageId", "channelId", "content"]);
  }
}