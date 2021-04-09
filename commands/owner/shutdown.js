const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args) => {
    message.channel.send("kthxbai")
    client.destroy()
    process.exit(69)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5
};

exports.help = {
    name: 'shutdown',
    description: 'Shut this bot down',
    usage: 'shutdown'
};