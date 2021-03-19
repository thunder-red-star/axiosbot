const Discord = require('discord.js'),
    AlexAPI = require('alexflipnote.js'),
    settings = require('../../settings.json'),
    AlexClient = new AlexAPI(process.env.apitoken);

exports.run = async (client, message, args) => {
    let avatar = ""
    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.cache.get(userid)
        avatar = user.avatarURL({ format: 'png', dynamic: true, size: 2048 })
        if (user === undefined) {
            avatar = message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 })
        }
    }

    link = await AlexClient.image.amiajoke({ image: avatar })
    message.channel.send({ files: [{ attachment: link }] });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: 'amiajoke',
    description: 'Am I A Joke to You?',
    usage: 'amiajoke (w or w/o @mention)'
};

