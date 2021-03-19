const Discord = require('discord.js'),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    Coins = require('../../models/coins.js');

exports.run = async (client, message, args, tools) => {
    message.channel.send('WIP!')
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