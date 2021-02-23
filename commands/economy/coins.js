const Discord = require('discord.js');
const superagent = require('superagent');
const mongoose = require('mongoose');
const Coins = require('../../models/coins.js');

exports.run = async (client, message, args, tools) => {
    if (!args[0]) {
        const data = await Coins.findOne({
            userID: message.author.id
        });
        let coinsEmbed = new Discord.MessageEmbed()
        .setTitle("Coins")
        .setColor("#d000a8")
        .setDescription(`You have ${data.coins} coins, and ${data.bank}/${data.capacity} coins in the bank.`)
        message.channel.send(coinsEmbed)
    }
    else {
        const data = await Coins.findOne({
            userID: message.mentions.users.first().id
        });
        if (!data) {return message.channel.send('That user doesn\'t have any coins on record!')}
        else {
        let coinsEmbed = new Discord.MessageEmbed()
        .setTitle("Coins")
        .setColor("#d000a8")
        .setDescription(`You have ${data.coins} coins, and ${data.bank}/${data.capacity} coins in the bank.`)
        message.channel.send(coinsEmbed)}
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
    name: 'coins',
    description: 'Checks the number of coins you, or someone else, has.',
    usage: 'coins <mention>',
};