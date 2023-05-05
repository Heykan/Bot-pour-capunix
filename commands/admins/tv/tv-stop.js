module.exports = {
    name: 'tv-stop',
    isDeletable: true,
    isAdmin: true,
    desc: 'Arrête l\'écoute des lives et upload vidéo.',
    isEnable: true,
    execute: async (bot, message, args) => {
        const tv = bot.modules.get('tv');
        tv.isStart = false;
    }
}