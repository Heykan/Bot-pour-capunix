module.exports = {
    name: "ready",
    execute: (bot) => {
        console.log("Bot en ligne");
        bot.modules.get("updateVocalTime").execute(bot);
    }
}