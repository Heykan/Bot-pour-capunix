module.exports = {
    name: "profile",
    isDeletable: true,
    aliases : ['profil'],
    desc: 'Affiche votre profil utilisateur.',
    isEnable: true,
    execute: async (bot, message) => {
        bot.modules.get('drawProfil').execute(bot, message);
    }
}