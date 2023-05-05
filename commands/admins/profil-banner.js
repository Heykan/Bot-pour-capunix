module.exports = {
    name: 'profile-banner',
    aliases: ["profil-banner"],
    isDeletable: false,
    isAdmin: true,
    desc: 'Permet de customiser votre bannière de profil avec l\'image en pièce jointe. La taille recommandé est 700x250.',
    isEnable: true,
    execute: async (bot, message) => {
        if (message.attachments.size < 1) return message.reply('Il manque votre bannière en pièce jointe.');

        const bannerUrl = message.attachments.array()[0].url;
        bot.modules.get("download").execute(bot, bannerUrl, `./assets/images/profile/${message.author.id}.png`, () => bot.messageDelete(message, 0));
        message.reply('Votre bannière à bien été télécharger sur le serveur.');
    }
}