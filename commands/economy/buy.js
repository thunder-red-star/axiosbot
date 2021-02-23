const Discord = require('discord.js');
const superagent = require('superagent');
const mongoose = require('mongoose');
const Coins = require('../../models/coins.js');

exports.run = async (client, message, args, tools) => {
    message.channel.send('Coming soon!')
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