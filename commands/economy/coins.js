const Discord = require('discord.js'),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    Coins = require('../../models/coins.js');

exports.run = async (client, message, args, tools) => {
    if (!args[0]) {
        const data = await Coins.findOne({
            userID: message.author.id
        });
        let coinsEmbed = new Discord.MessageEmbed()
            .setTitle("Coins")
            .setColor("#0174c3")
            .setDescription(`You have ${data.coins} coins, and ${data.bank}/${data.capacity} coins in the bank.`)
        message.channel.send(coinsEmbed)
    }
    else {
        let user = message.mentions.users.first();
        if (user === undefined) {
            let userid = message.content.split(" ").slice(1, 2).join("")
            user = await client.users.cache.get(userid)
            if (user === undefined) {
                message.channel.send("Please provide an actual mention or id!")
            }
        }
        const data = await Coins.findOne({
            userID: user.id
        });
        if (!data) { return message.channel.send('That user doesn\'t have any coins on record!') }
        else {
            let coinsEmbed = new Discord.MessageEmbed()
                .setTitle("Coins")
                .setColor("#0174c3")
                .setDescription(`You have ${data.coins} coins, and ${data.bank}/${data.capacity} coins in the bank.`)
            message.channel.send(coinsEmbed)
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
    name: 'coins',
    description: 'Checks the number of coins you, or someone else, has.',
    usage: 'coins <mention>',
};