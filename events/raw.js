module.exports = {
    name: "raw",
    execute: async (bot, packet) => {
        if (packet.t == 'MESSAGE_REACTION_ADD') {
            const channel = await bot.channels.cache.get(packet.d.channel_id);
            const member = await channel.guild.members.cache.get(packet.d.user_id);
            if (member.user.id == bot.user.id) return;

            channel.messages.fetch(packet.d.message_id).then(message => {
                const emoji = packet.d.emoji.id ? `${packet.d.emoji.id}:${packet.d.emoji.name}` : packet.d.emoji.name;
                const reaction = message.reactions.cache.get(emoji);
                if (reaction) reaction.users.cache.set(packet.d.user_id, bot.users.cache.get(packet.d.user_id));
                bot.modules.get("reactionAdded").execute(bot, message, reaction, member)
            });
        }

        if (packet.t == 'MESSAGE_DELETE'){
            bot.modules.get('messageDelete').execute(bot, packet.d.guild_id, packet.d.channel_id, packet.d.id);
        }
    }
}