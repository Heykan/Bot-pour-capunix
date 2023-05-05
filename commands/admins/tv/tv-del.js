module.exports = {
    name: 'tv-del',
    isDeletable: true,
    isAdmin: true,
    desc: `Supprime un compte twitch/youtube à l'utilissateur. !tv-del youtube/twitch @User`,
    isEnable: true,
    execute: async (bot, message, args) => {
        if (args.length < 1) return message.channel.send('Vous devez préciser le type de lien à supprimer twitch/youtube/both (pour les 2).').then(msg => bot.messageDelete(msg, 5));

        const type = args[0];
        const user = message.mentions.users.first();

        switch (type){
            case 'twitch':
                await bot.DATABASE.update('user', 'twitchAccount', null, 'userId', user.id);
                message.channel.send('Le compte twitch à bien été supprimer.').then(msg => bot.messageDelete(msg, 5));
                break;
            case 'youtube':
                await bot.DATABASE.update('user', 'youtubeAccount', null, 'userId', user.id);
                message.channel.send('Le compte youtube à bien été supprimer.').then(msg => bot.messageDelete(msg, 5));
                break;
            case 'both':
                await bot.DATABASE.update('user', 'twitchAccount', null, 'userId', user.id);
                await bot.DATABASE.update('user', 'youtubeAccount', null, 'userId', user.id);
                message.channel.send('Les comptes twitch et youtube ont bien été supprimer.').then(msg => bot.messageDelete(msg, 5));
                break;
            default:
                return message.channel.send('Vous devez préciser le type de lien à supprimer twitch/youtube/both (pour les 2).').then(msg => bot.messageDelete(msg, 5));
                break;
        }
    }
}