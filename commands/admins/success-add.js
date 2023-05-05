module.exports = {
    name: "success-add",
    aliases: [],
    isAdmin: true,
    isDeletable: false,
    desc: 'Ajoute un succès à la base de données, veuillez écrire la commande sous la forme suivante : !success-add [nom] [level] [catégorie] [description], avec l\'icone png en pièce jointe.',
    isEnable: false,
    execute: async (bot, message, args) => {
        if (args.length < 4 || message.attachments.size < 1) return message.channel.send("Argument invalide, veuillez ré-écrire la commande sous la forme suivante : !success-add [nom] [level] [catégorie] [description], avec l'icone png en pièce jointe.").then(msg => bot.messageDelete(msg, 60));
        let nameArray = [];
        let separatorG;
        let end;
        let count = 0;

        args.forEach(a => {
            if (a.startsWith(`"`)) separatorG = true;
            if (separatorG)
            {
                if (!(a.startsWith(`"`) || a.endsWith(`"`)) && !end) { 
                    nameArray.push(a); 
                    count++;
                }
                if (a.startsWith(`"`)) {
                    count++;
                    nameArray.push(a.slice(1)); 
                }
                if (a.endsWith(`"`)) 
                {
                    end = true;
                    nameArray.push(a.slice(0, -1));
                    count++;
                    return;
                }
            }else
            {
                if (!isNaN(a)) {
                    end = true;
                    return;
                }
                else {
                    if (end) return;
                    nameArray.push(a);
                    count++;
                }
            }
        })

        const last = await bot.DATABASE.last("success", "id");
        const id = last ? last.id : 1;
        const name = nameArray.join(" ");
        const level = args.slice(count)[0];
        const category = args.slice(count)[1];
        const iconUrl = message.attachments.array()[0].url;
        const dbUrl = `./assets/images/success/${id + 1}.png`;
        const description = args.slice(count + 2).join(" ");

        bot.modules.get("download").execute(bot, iconUrl, dbUrl, () => bot.messageDelete(message, 0));

        const insert = await bot.DATABASE.insert("success", [name, level, category, dbUrl, description], ["name", "level", "category", "iconUrl", "desc"]);
        insert ? message.channel.send("Succès ajouter avec succès à la BDD").then(msg => bot.messageDelete(msg, 20)) : message.channel.send("Un succès avec le même nom existe déjà. ◑﹏◐").then(msg => bot.messageDelete(msg, 20));
    }
}