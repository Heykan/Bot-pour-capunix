module.exports = {
    name: 'updateUserExp',
    execute: async (bot, message, user, xp) => {
        const xpCalcul = bot.modules.get('getXpForNextLevel');
        await bot.DATABASE.update("user", "xp", user.xp + xp, "userId", user.userId);

        let new_level = xpCalcul.execute(user.lvl + 1);
        if (user.xp + xp >= new_level)
        {
            let xp_left = user.xp + xp - new_level;
            let lvl_gain = 1;
            await bot.DATABASE.update("user", ['lvl'], [user.lvl + lvl_gain], "userId", message.author.id);
            await bot.DATABASE.update("user", "xp", 0, "userId", user.userId);
        
            while (xp_left > xpCalcul.execute(user.lvl + lvl_gain)) {
                xp_left -= xpCalcul.execute(user.lvl + lvl_gain);              
                
                await bot.DATABASE.update("user", ['lvl', 'xp'], [user.lvl + lvl_gain, xp_left], "userId", message.author.id);
                lvl_gain++;
            }

            //message.reply(`Félicitation tu viens de passer au Niv. ${user.lvl + lvl_gain}.`);
            //bot.modules.get('drawProfil').execute(bot, message);
        }
    }
}
