module.exports = {
    name: "updateVocalTime",
    execute: async (bot) => {
    let guilds = bot.guilds.cache.filter(guild => guild.name.startsWith('SUN'));
    bot.setInterval(() => {
        guilds.forEach(guild => {
            guild.channels.cache.filter(channel => channel.type == "voice").forEach(channel => { 
                channel.members.forEach(async (member) => {
                        if (member.voice.mute || member.voice.deaf) return;
                        let user = await bot.DATABASE.get("user", "userId", member.user.id);
                        if (!user){
                            return await bot.DATABASE.insert("user", [member.user.id, 1, 0, 0, 1, 1, null, null, null, 0]);
                        }
                        await bot.DATABASE.update("user", "vocalCount", user.vocalCount + 1, "userId", member.user.id);
                        //await bot.DATABASE.update("user", "xp", user.xp + 1, "userId", member.user.id);
                    });             
                })
            })
        }, 60000);  // Toutes les minutes */
    }
}
