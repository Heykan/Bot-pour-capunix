let gameName = "countGame";

module.exports = {
    name: gameName,
    channel: 0,
    lastMember: 0,
    objective: 1000,
    objectiveMax: 1000,
    objectiveMin: 1,
    lastNumber: 0,
    palier: 0,
    palierLimit: 100,
    gameStart: false,
    execute: (bot, message) => {
        const _this = bot.minigames.get(gameName);
        if (message.channel.id != _this.channel) return;
        let number = parseInt(message.content);

        if (_this.lastMember.id == message.author.id) return loose(bot, _this, message);

        if (number == _this.objective){
            message.channel.bulkDelete(100, true);
            message.channel.send(`Félicitation à <@${message.author.id}> pour avoir atteint ${_this.objective} !\nOn peut l'applaudir ! 🎉🎉🎉🎊🎊🎊`);

            // New random number
            let max = Math.floor(Math.random() * (_this.objectiveMax - _this.objectiveMin)) + _this.objectiveMin;
            _this.objective = max;

            // Game start
            message.channel.send(`Début de la partie ! On vise le nombre : ${_this.objective}`);
            _this.lastNumber = 0;
            _this.palier = 0;
            return;
        }

        if (number == _this.lastNumber + 1){
            _this.lastMember = message.author;
            _this.lastNumber = number;
            let palier = Math.floor(number/_this.palierLimit);
            if (palier > _this.palier){
                message.channel.send(`Nouveau palier atteint : ${number}`);
                _this.palier = palier;
            }
        }else{
            loose(bot, _this, message);
        }
    }
}

function loose(bot, _this, message){
        _this.lastNumber = _this.palier * _this.palierLimit;
        _this.lastNumber == 0 ? _this.lastNumber : _this.lastNumber--;
        console.log(_this.lastNumber);
        message.channel.send(`<@${message.author.id}> s'est trompé.\nOn reprend avec le chiffre ${_this.lastNumber} !`);
}