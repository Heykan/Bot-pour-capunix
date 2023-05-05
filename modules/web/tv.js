module.exports = {
    name: 'tv',
    isStart: false,
    streamers: [],
    videaste: [],
    execute: async (bot, message) => {
        const _this = bot.modules.get('tv');
        const youtube = bot.modules.get('youtube-user');
        const channel = await bot.modules.get('sendChannel').execute(bot, 'tv', message.guild.id);
        if (!channel) return message.channel.send(`Il n'y a pas de canal définis pour la tv. Merci de faire un **!channel tv** dans le canal approprié.`).then(msg => bot.messageDelete(msg, 20));

        setInterval(async () => {
            if (!_this.isStart) return;

            const hours = new Date().getHours();
            const isDay = hours > 6 && hours < 22;
            const guild = await bot.DATABASE.get('tv', 'guildId', message.guild.id);

            let liveMessage;
            if (guild && guild.twitchMessage)
                liveMessage = guild.twitchMessage;
            else
                liveMessage = `viens de lancer un live`;

            let videoMessage;
            if (guild && guild.youtubeMessage)
                videoMessage = guild.youtubeMessage;
            else
                videoMessage = `viens de mettre en ligne une nouvelle vidéo !`;

            if (guild && !guild.dayRoleId && !guild.nightRoleId) return message.channel.send(`Merci de définir un rôle pour les mentions.`).then(msg => bot.messageDelete(msg, 5));

            // youtube
            for (let i = 0; i < _this.videaste.length; ++i){
                try {
                    if (_this.videaste[i].youtube){
                        const video = await youtube.execute(bot, _this.videaste[i].youtube, _this.videaste[i].youtubeOption, 'video');
                        if (video)
                            channel.send(`${video.author}, ${videoMessage}\n${video.title}\n${video.link}\n${isDay ? `<@&${guild.dayRoleId}> <@&${guild.nightRoleId}>` : `<@&${guild.nightRoleId}>`}`);
                        
                        const live = await youtube.execute(bot, _this.videaste[i].youtube, _this.videaste[i].youtubeOption, 'live');
                        if (live.items.length > 0 && !_this.videaste[i].isStream){
                            const data = live.items[0].snippet;
                            const vid = live.items[0].id.videoId;
                            _this.videaste[i].isStream = true;
                            channel.send(`${data.channelTitle}, ${liveMessage}\n${data.title}\nhttps://www.youtube.com/watch?v=${vid}\n${isDay ? `<@&${guild.dayRoleId}> <@&${guild.nightRoleId}>` : `<@&${guild.nightRoleId}>`}`);
                        }
                        if (live.items.length < 1) {
                            _this.videaste[i].isStream = false;
                        }
                    }
                }catch (e) {  }
            }

            //twitch
            for (let i = 0; i < _this.streamers.length; ++i){
                try {
                    if (!_this.streamers[i].twitch) continue;
                    const stream = await _this.streamers[i].twitch.getStream();

                    if (stream){
                        if (!_this.streamers[i].prevStream){
                            channel.send(`${stream.userDisplayName}, ${liveMessage}\n${_this.streamers[i].link.twitch}\n${isDay ? `<@&${guild.dayRoleId}> <@&${guild.nightRoleId}>` : `<@&${guild.nightRoleId}>`}`);
                            _this.streamers[i].prevStream = stream;
                        }
                    }else{
                        _this.streamers[i].retry++;
                        if (_this.streamers[i].retry >= 10){
                            _this.streamers[i].prevStream = null;
                        }
                    }
                }catch (e) {  }
            }
        }, 120 * 1000);
    }
}