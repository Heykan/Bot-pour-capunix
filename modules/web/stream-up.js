const { SimpleAdapter, WebHookListener } = require('twitch-webhooks');

module.exports = {
    name: 'stream-up',
    execute: async (bot, userId) => {
        let prevStream = await bot.twitch.helix.streams.getStreamByUserId(userId);

        const subscription = await bot.liveListener.subscribeToStreamChanges(userId, async stream => {
            if (stream) {
                if (!prevStream) {
                    console.log(`${stream.userDisplayName} just went live with title: ${stream.title}`);
                }
            } else {
                // no stream, no display name
                const user = await apiClient.helix.users.getUserById(userId);
                console.log(`${user.displayName} just went offline`);
            }
            prevStream = stream ? stream : null;
        });
    }
}