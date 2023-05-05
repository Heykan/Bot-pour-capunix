module.exports = {
    name: "reactionAdded",
    execute: async (bot, message, reaction, member) => {
        if (message.channel.name != "suggestions") return;

        const { emoji } = reaction;
        if (!(emoji.name == '👍' || emoji.name == '👎')) return await reaction.users.remove(member.user.id);
        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(member.user.id));

        if (userReactions.length <= 1) return;

        userReactions.forEach(async (r) => {
            const oldEmoji = r.emoji;
            if (emoji.name != oldEmoji.name) await r.users.remove(member.user.id);
        });
    }
}