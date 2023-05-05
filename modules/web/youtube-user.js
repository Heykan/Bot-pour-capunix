const request = new (require('rss-parser'))();
const db = require("quick.db");
const http = require('https');

module.exports = {
    name: 'youtube-user',
    execute : async (bot, channelId, option, type) => {
        return new Promise((resolve, reject) => {
            const chan = {
                host: 'www.googleapis.com',
                path : `/youtube/v3/channels?${option}=${channelId}&key=${bot.config.googleApi}&part=snippet,contentDetails,statistics`
            };

            const callback = (response) => {
                let str = '';
        
                response.on('data', function (chunk) {
                    str += chunk;
                });
        
                response.on('end', async function () {
                    ytb = JSON.parse(str);
                    let id = ytb.items[0].id;

                    if (type == 'video'){
                        let v = await getVideo(id);
                        resolve(v);
                    }else if (type == 'live'){
                        let l = await getLive(bot, id);
                        resolve(l);
                    }
                });
            }
            
            http.request(chan, callback).end();
        });
    }
}

function getVideo(id){
    return new Promise(resolve => {
        if (db.fetch(`postedVideos`) === null) db.set(`postedVideos`, []);
        request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`).then(data => {
            if (db.fetch(`postedVideos`).includes(data.items[0].link)) resolve(null);
            db.push(`postedVideos`, data.items[0].link);
            resolve(data.items[0]);
        });
    });
}

function getLive(bot, id){
    return new Promise (resolve =>{
        const live = {
            host: 'www.googleapis.com',
            path : `/youtube/v3/search?part=snippet&channelId=${id}&type=video&eventType=live&key=${bot.config.googleApi}`
        };

        const callback = (response) => {
            let str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                let l = JSON.parse(str);
                resolve(l);
            });
        }
        
        http.request(live, callback).end();
    });
}