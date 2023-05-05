module.exports = {
    name: 'restore-banner',
    isDeletable: true,
    isAdmin: true,
    desc: 'Remet la bannière par défaut.',
    isEnable: true,
    execute: (bot, message) => {
        bot.modules.get("deleteFile").execute(`./assets/images/profile/${message.author.id}.png`);
        message.reply('Bannière par défaut restaurer.');
    }
}