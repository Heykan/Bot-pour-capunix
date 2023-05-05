module.exports = {
    name: 'tv-start',
    isDeletable: true,
    isAdmin: true,
    desc: `Démarre l'écoute des live et upload vidéos.`,
    isEnable: true,
    execute: async (bot, message) => {
        const tv = bot.modules.get('tv');
        const list = bot.modules.get('updateStreamerList');
        
        //if (streamers.length < 1) return message.channel.send(`Il n'y a pas de streamer sur ce discord.`).then(msg => bot.messageDelete(msg, 10));
        
        list.execute(bot);

        tv.isStart = true;
        tv.execute(bot, message);
    }
}