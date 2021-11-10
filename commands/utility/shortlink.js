const Discord = require('discord.js');
const axios = require('axios');
const firebase = require('firebase')

exports.run = async (client, message, args, tools) => {
    let link = message.content.split(" ").slice(1).join(" ")
    const data = await axios({
        method: 'post',
        url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' + process.env.firebasekey,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            dynamicLinkInfo: {
                domainUriPrefix: 'thdr.me',
                link: link,
                iosInfo: {
                    iosBundleId: 'com.bundleId',
                    iosAppStoreId: '1512677811',
                    iosIpadBundleId: 'com.bundleId',
                },
                androidInfo: {
                    androidPackageName: 'com.bundleId',
                },
                socialMetaTagInfo: {
                    socialTitle: `A short url by ThunderRedStar`,
                    socialDescription: `Made by Axios - his bot`,
                }
            },
            suffix: {
                option: 'SHORT',
            },
        }
    });
    let embed = new Discord.MessageEmbed()
        .setTitle("Shortened Link")
        .setColor("#0174c3")
        .setDescription(data.data.shortLink)
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5,
    cooldown: 0
};

exports.help = {
    name: 'shortlink',
    description: 'Gives you back a short link',
    usage: 'shortlink <url>'
};