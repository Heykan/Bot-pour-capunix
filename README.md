# SUN INFO : 
---
SUN™Bot écrit en NodeJS avec la librairie [discord.js](https://discord.js.org/).
Une fonctionnalité = une branche.
Branch construction : 
issue[#NUMISSUE]

Quand une fonctionnalité est terminée, merge avec la branche staging.
Merci de ne pas push ou merge sur la branche master. Vous pouvez faire une pull-request et attendre validation d'un collègue pour merge.

Si vous avez des questions sur une fonctionnalité, merci de la poser dans l'issue correspondante.


# Ce projet utilise : [discord.js](https://discord.js.org/)
- Auteur: Fulash


### Installation

Créez un projet npm dans un dossier puis intégrez [discord.js](https://discord.js.org/)
```sh
npm init
npm i --save discord.js
```

### Créer une commande/event
Pour créer une commande ou un event il faut suivre le modèle suivant au minimum et respecter les dossiers de base (les sous dossier sont inclus) :

- Pour les events:

```js
module.exports = {
    name: "module_ou_event_nom",
    execute: (bot, message, args) => {
        // Votre méthode
    }
}
```

- Pour les commandes:
```js
module.exports = {
    name: "module_ou_event_nom",
    isAdmin: true/false,
    aliases: ["vos", "raccourci"], // Celui-ci est optionnel même sans le mettre, le bot fonctionnera !!
    isDeletable: true/false, // Si on supprime la commande joueur après son envoi
    desc: 'La description pour le !help',
    execute: (bot, message, args) => {
        // Votre méthode
    }
}
```

Si vous avez besoin d'accéder à la BDD juste mettre la méthode en async et utiliser await :
```js
module.exports = {
    name: "commande_name",
    execute: async (bot, message, args) => {
        // Votre méthode
        let data = await bot.DATABASE.get("table", "colum id name", data_id]); // La column est sa valeur sont optionnels, juste la table renverra forcémenet le premier résultat.
    }
}
```
### BDD

Pour l'accès à la BDD, on a ajoutés des méthodes custom : 
```js
    bot.DATABASE.get(nom_de_la_table, optionnal:[nom_dune_colonne, valeur_de_la_colonne]) // Retourne la première valeur d'une liste, les valeurs optonnel ne sont pas obligatoire
    bot.DATABASE.all(nom_de_la_table, optionnal:[nom_dune_colonne, valeur_de_la_colonne]) // Retourne toutes les valeurs d'une liste, les valeurs optonnel ne sont pas obligatoire
    bot.DATABASE.last(nom_de_la_table, nom_de_calonne_id) // Retourne la dernière valeur d'une liste, en fonction d'une colonne
    bot.DATABASE.insert(nom_de_la_table, [vos_valeurs, dans_lordre], [nom_des_colonne]) // Insert une valeur dans la bdd, le nom des colonnes n'est pas obligatoire si vous renseigner tout
    bot.DATABASE.update(nom_de_la_table, colonne_a_mettre_a_jour, nouvelle_valeur, colonne_id, id) // Met à jour une valeur
    bot.DATABASE.delete(nom_de_la_table, colonne_id, id) // Supprime une valeur
```

### Minijeux
Pour créer un minijeux, créer votre module dans le dossier minijeux(sous-dossier inclus), avec la structure minimum suivante :

/❗\\/❗\\/❗\\/❗\\/❗\ Les minijeux sont basés sur les salons textuels et donc s'exécute sur l'event message /❗\/❗\/❗\/❗\/❗\
```js
module.exports = {
    name: "name",
    gameStart: true/false,
    execute: () => {
        /*
            La méthode de votre jeu
            Pour lancer le minijeu juste passer le gameStart à true et pour l'arrêter à false
        */
    }


    // Pour lancer le minijeu par exemple dans une commande
    let game = bot.minigames.get("name");
    game.gameStart = true;
```

### Modules
Avec CubeX, on a mis en place un système de module, afin de rendre le système de gestion de commande plus simple ou même pour les minijeux ou autres...
Pour déclarer un module, c'est exactement comme avant, je vous passe le minimum mais, vous pouvez ajouter d'autre propriété à celui-ci.

```js
module.exports = {
    name: "name",
    uneAutrePropriété: value,
    execute: async (bot, autant d'argument que necéssaire) => {
        /*
            Votre code
        */
    }


    // Pour appeler le module
    const module = bot.modules.get("name");
    module.execute(bot, les arguments s'il y en a);
```

### Méthode(s)/Propriété(s) custom du bot :
Voici la liste des méthodes et propriétés custom du bot :
```js
    // Sytème de BDD
    bot.DATABASE.get(nom_de_la_table, optionnal:[nom_dune_colonne, valeur_de_la_colonne]) // Retourne la première valeur d'une liste, les valeurs optonnel ne sont pas obligatoire
    bot.DATABASE.all(nom_de_la_table, optionnal:[nom_dune_colonne, valeur_de_la_colonne]) // Retourne toutes les valeurs d'une liste, les valeurs optonnel ne sont pas obligatoire
    bot.DATABASE.last(nom_de_la_table, nom_de_calonne_id) // Retourne la dernière valeur d'une liste, en fonction d'une colonne
    bot.DATABASE.insert(nom_de_la_table, [vos_valeurs, dans_lordre], [nom_des_colonne]) // Insert une valeur dans la bdd, le nom des colonnes n'est pas obligatoire si vous renseigner tout
    bot.DATABASE.update(nom_de_la_table, colonne_a_mettre_a_jour, nouvelle_valeur, colonne_id, id) // Met à jour une valeur
    bot.DATABASE.delete(nom_de_la_table, colonne_id, id) // Supprime une valeur
    
    // Suppresion d'un message
    bot.messageDelete(msg, timeInSecond) //Supprime un message du bot après x seconde(s)
    // Exemple
    message.channel.send("Votre message à supprimer après x temps").then(msg => bot.messageDelete(msg, 5));
    
    // Les rôles pouvant utiliser les commandes admin du bot :
    bot.ADMIN // à compléter plus tard
    
    // Les couleurs pour les embed par exemples :
    bot.COLOR.LaCouleur
    /*
        Couleur dispo :
        DEFAULT: 0,
        AQUA: 1752220,
        GREEN: 3066993,
        BLUE: 3447003,
        PURPLE: 10181046,
        GOLD: 15844367,
        ORANGE: 15105570,
        RED: 15158332,
        GREY: 9807270,
        DARKER_GREY: 8359053,
        NAVY: 3426654,
        DARK_AQUA: 1146986,
        DARK_GREEN: 2067276,
        DARK_BLUE: 2123412,
        DARK_PURPLE: 7419530,
        DARK_GOLD: 12745742,
        DARK_ORANGE: 11027200,
        DARK_RED: 10038562,
        DARK_GREY: 9936031,
        LIGHT_GREY: 12370112,
        DARK_NAVY: 2899536,
        LUMINOUS_VIVID_PINK: 16580705,
        DARK_VIVID_PINK: 12320855
    */
    
```

License
----

MIT
