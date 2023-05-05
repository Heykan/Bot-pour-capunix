module.exports = {
    name: 'reload',
    isAdmin: true,
    isEnable: true,
    desc: 'Permet de recharger le bot. Possible de recharger uniquement certaines parties (commandes/modules/minijeux)',
    isDeletable: true,
    execute: (bot, message, args) => {
        switch (args[0]){
            case 'command':
            case 'commands':
            case 'commande':
            case 'commands':
                bot.reloadCommands(bot);
                message.channel.send('Commandes rechargées avec succès');
                break;

            case 'minigame':
            case 'minigames':
            case 'minijeu':
            case 'minijeux':
                bot.reloadMinigames(bot);
                message.channel.send('Minijeux rechargés avec succès');
                break;

            case 'module':
            case 'modules':
                bot.reloadModules(bot);
                message.channel.send('Minijeux rechargés avec succès');
                break;

            default:
                bot.reloadCommands(bot);
                bot.reloadMinigames(bot);
                bot.reloadModules(bot);
                message.channel.send('Le bot a été recharger avec succès');
        }
    }
}