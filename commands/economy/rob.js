const Discord = require('discord.js'),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    Coins = require('../../models/coins.js');

exports.run = async (client, message, args, tools) => {
    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.cache.get(userid)
        if (user === undefined) {
            message.channel.send("Please provide an actual mention or id!")
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    cooldown: 0

};

exports.help = {
    name: 'buy',
    description: 'Lets you buy an item',
    usage: 'buy <id> <quantity>',
};