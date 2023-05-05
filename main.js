const { Client, Collection } = require("discord.js");
const { INFO, ADMIN, COLOR_EMBED, GAME_CHANNEL } = require("./config.js");
const { GET, ALL, UPDATE, INSERT, LAST, DELETE, NOT_NULL } = require("./database.js");
const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');

const clientId = 'fmzex428u96j87f6nje1jcfozmvrxx';
const clientSecret = 'qc19uqg4pskr64pq36rba86w0dnsk4';
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

const { loadCommands, loadEvents, loadMinigames, loadModules } = require("./loaders.js")

async function main(){
    const bot = new Client(INFO);
    //["commands", "messageCD", "minigames", "modules"].forEach(collect => bot[collect] = new Collection());
    bot.messageCD = new Collection();
    bot.DATABASE = {
        get: GET,
        all: ALL,
        update: UPDATE,
        insert: INSERT,
        last: LAST,
        delete: DELETE,
        notNull: NOT_NULL
    }
    bot.ADMIN = ADMIN;
    bot.COLOR = COLOR_EMBED;
    bot.GAME_CHANNEL = GAME_CHANNEL;
    bot.messageDelete = async (message, time) => { await message.delete({ timeout: time * 1000 }); }

    bot.config = await bot.DATABASE.get("config", "id", 1);
    bot.prefix = bot.config.prefix;
    bot.delete = Boolean(bot.config.delete);

    //TV
    bot.twitch = new ApiClient({ authProvider });

    bot.reloadCommands = loadCommands;
    bot.reloadEvents = loadEvents;
    bot.reloadMinigames = loadMinigames;
    bot.reloadModules = loadModules;

    bot.reloadCommands(bot);
    bot.reloadEvents(bot);
    bot.reloadMinigames(bot);
    bot.reloadModules(bot);

    bot.login(bot.config.token);
}

main();