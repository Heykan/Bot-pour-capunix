module.exports = {
    name: 'twitch-user',
    execute: async (bot, userName) => {
        const user = await bot.twitch.helix.users.getUserByName(userName);
        if (!user) {
            return false;
        }
        return user;
    }
}