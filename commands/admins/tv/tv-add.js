module.exports = {
    name: 'tv-add',
    isDeletable: true,
    isAdmin: true,
    desc: `Ajoute un compte twitch/youtube à l'utilissateur. !tv-add lien @User`,
    isEnable: true,
    execute: async (bot, message, args) => {
        if (args.length < 1) return message.channel.send('Merci de renseigner un lien.').then(msg => bot.messageDelete(msg, 5));

        const link = args[0];
        const user = message.mentions.users.first();
        const tv = bot.modules.get('tv');
        const list = bot.modules.get('updateStreamerList');

        if (!link.startsWith('http://') && !link.startsWith('https://')) return message.channel.send('Lien non valide.').then(msg => bot.messageDelete(msg, 5));

        if (link.includes('twitch.tv')){
            await bot.DATABASE.update('user', 'twitchAccount', link, 'userId', user.id);
            message.channel.send(`Compte twitch de l'utilisateur mise à jour.`).then(msg => bot.messageDelete(msg, 5));

            if (tv.isStart) {
                tv.isStart = false;
                list.execute(bot);
                tv.isStart = true;
            }
        }
        else if (link.includes('youtube.com')){
            await bot.DATABASE.update('user', 'youtubeAccount', link, 'userId', user.id);
            message.channel.send(`Compte youtube de l'utilisateur mise à jour.`).then(msg => bot.messageDelete(msg, 5));
        }
        else return message.channel.send(`Le lien ne correspond pas à twitch ou youtube.`).then(msg => bot.messageDelete(msg, 5));
    }
}