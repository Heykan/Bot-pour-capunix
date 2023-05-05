module.exports = {
    name: 'isAdmin',
    execute: (bot, message) => {
        let roleNeed = false;
        bot.ADMIN.roles.forEach(findrole =>{
            if(message.member.roles.cache.some(role => role.name === findrole)) roleNeed = true; //if user has role, sets bool to true
        })
        if (message.author.id == message.guild.ownerID) roleNeed = true;
        return roleNeed;
    }
}