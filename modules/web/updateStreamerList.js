module.exports = {
    name: 'updateStreamerList',
    execute: async (bot) =>{
        const streamers = await bot.DATABASE.notNull('user', 'twitchAccount');
        const videastes = await bot.DATABASE.notNull('user', 'youtubeAccount');
        const tv = bot.modules.get('tv');
        tv.streamers = [];
        
        videastes.forEach(async videaste => {
            const youtubeId = videaste.youtubeAccount.includes('channel/') ? videaste.youtubeAccount.split('/channel/')[1] : videaste.youtubeAccount.split('/user/')[1];
            const s = {
                youtube: youtubeId ? youtubeId : null,
                youtubeOption: videaste.youtubeAccount.includes('channel/') ? 'id' : 'forUsername',
                link: {
                    youtube : videaste.youtubeAccount
                },
                isStream: false
            }
            
            tv.videaste.push(s);
        });

        streamers.forEach(async streamer => {
            const twitchName = streamer.twitchAccount.split('twitch.tv/')[1];
            const s = {
                name: twitchName,
                prevStream: null,
                link: {
                    twitch : streamer.twitchAccount
                },
                twitch: twitchName ? await bot.modules.get('twitch-user').execute(bot, twitchName) : null,
                retry: 0
            }
            
            tv.streamers.push(s);
        });
    }
}