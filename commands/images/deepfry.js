const Discord = require('discord.js'),
    AlexAPI = require('alexflipnote.js'),
    settings = require('../../settings.json'),
    AlexClient = new AlexAPI(process.env.apitoken);

exports.run = async (client, message, args) => {
    let avatar = message.content.split(" ").slice(1, 2)
    link = await AlexClient.image.deepfry({ image: avatar })
    message.channel.send({ files: [{ attachment: link }]});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: 'deepfry',
    description: 'Deepfry someone',
    usage: 'deepfry (w or w/o @mention)'
};

