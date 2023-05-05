const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'drawProfil',
    execute : async (bot, message) => {
        
        /*
                
                ____  ____  ____  ____________    ______
                / __ \/ __ \/ __ \/ ____/  _/ /   / ____/
            / /_/ / /_/ / / / / /_   / // /   / __/   
            / ____/ _, _/ /_/ / __/ _/ // /___/ /___   
            /_/   /_/ |_|\____/_/   /___/_____/_____/   
                                            

        */

        const xpCalcul = bot.modules.get('getXpForNextLevel');
        const userDb = await bot.DATABASE.get('user', 'userId', message.author.id);
        const userMedals = userDb.success ? userDb.success.split(',') : null;
        const canvasHeight = userMedals ? Math.ceil(userMedals.length / 16) * 42 + 370 : 350;
        const canvasProfile = Canvas.createCanvas(700, canvasHeight);
        const contextProfile = canvasProfile.getContext('2d');
        const backgroundCustom = bot.modules.get('fileExist').execute(`./assets/images/profile/${message.author.id}.png`);
        const background = backgroundCustom ? await Canvas.loadImage(`./assets/images/profile/${message.author.id}.png`) : await Canvas.loadImage('./assets/images/profile/default.png');
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: 'jpg'}));

        if (!userDb) return;

        const xpNeed = xpCalcul.execute(userDb.lvl + 1);

        contextProfile.drawImage(background, 0, 0, canvasProfile.width, 250);

        // Rect to draw around the background
        contextProfile.strokeStyle = '#74037b';
        contextProfile.strokeRect(0, 0, canvasProfile.width, 250);

        // Font & Text
        contextProfile.font = '20px sans-serif';
        contextProfile.fillStyle = '#ffffff';
        contextProfile.strokeStyle = 'black';
        stroke(contextProfile, `${message.author.tag}`, 250, 90);
        stroke(contextProfile, `Niveau ${userDb.lvl}`, 250, 115);
        stroke(contextProfile, `Nombre de message : ${userDb.messageCount}`, 250, 140);
        stroke(contextProfile, `Nombre d'heure en vocal : ${bot.modules.get('timeConverter').execute(userDb.vocalCount)}`, 250, 165);

        // Xp
        const percentage = (userDb.xp / xpNeed);

        // Create gradient
        const grd = contextProfile.createLinearGradient(180, 180, 350, 30);
        grd.addColorStop(0, '#74037b');
        grd.addColorStop(1, '#7b0331');

        // Text
        const xpText = `Xp : ${userDb.xp}/${xpNeed}`;
        const textSize = contextProfile.measureText(xpText);
        contextProfile.strokeStyle = '#74037b';
        contextProfile.fillStyle = grd;
        contextProfile.strokeRect(180, 180, 350, 30);
        contextProfile.fillRect(180, 180, 350 * percentage, 30);
        
        contextProfile.strokeStyle = 'black';
        contextProfile.fillStyle = '#ffffff';
        stroke(contextProfile, xpText, 180 + Math.abs(350/2 - textSize.width/2), 200);
        
        // Success
        stroke(contextProfile, `Succès débloqué(s) :`, 10, 280);

        // Avatar round
        contextProfile.save();
        contextProfile.beginPath();
        contextProfile.arc(125, 125, 100, 0, Math.PI * 2, true);
        contextProfile.closePath();
        contextProfile.clip();
        contextProfile.drawImage(avatar, 25, 25, 200, 200);
        contextProfile.restore();

        
        /*
                                    __      __    
                ____ ___  ___  ____/ /___ _/ /____
            / __ `__ \/ _ \/ __  / __ `/ / ___/
            / / / / / /  __/ /_/ / /_/ / (__  )
            /_/ /_/ /_/\___/\__,_/\__,_/_/____/

        */
        
        if (userMedals){
            // Medals
            let x = 10;
            let y = 300;
            
            for (const medal in userMedals){
                const success = await bot.DATABASE.get("success", "id", userMedals[medal]);
                if (!success) continue;
                const successImage = await Canvas.loadImage(success.iconUrl);
                contextProfile.drawImage(successImage, x, y, 32, 32);
                x += 42;
                if (x > 668) {
                    x = 10;
                    y += 42;
                }

            }
        }

        // Send message to chat
        const attachmentProfile = new MessageAttachment(canvasProfile.toBuffer(), 'user-profile.png');
        message.channel.send(attachmentProfile);
    }
}
    
function stroke(context, text, x, y){
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
}