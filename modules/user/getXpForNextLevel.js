module.exports = {
    name : 'getXpForNextLevel',
    execute: (level) => {
        return round(0.04 * (level ^ 3) + 0.8 * (level ^ 2) + 2 * level) + 30;
    }
}


function round(n){
    if (n < 0)
        return Math.ceil(n - 0.5);
    else
        return Math.floor(n + 0.5);
}