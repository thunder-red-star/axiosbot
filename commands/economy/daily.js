const Discord = require('discord.js');
const superagent = require('superagent');
const mongoose = require('mongoose');
const coins = require('../../models/coins.js')
const ms = require('ms')
const humanizeDuration = require("humanize-duration");


exports.run = async (client, message, args, tools) => {
    const Coins = require('../../models/coins.js')
    var coinadd = Math.floor(Math.random() * 200 + 900);
    const data = await Coins.findOne({
        userID: message.author.id
    });
    if (!data) {
        message.channel.send('Hold on, creating records for you since it\'s your first time using this bot')
        let newData = new Coins({
            _id: mongoose.Types.ObjectId(),
            userID: message.author.id,
            coins: coinadd,
            lastclaim: message.createdTimestamp,
            bank: 0,
            capacity: 1000
        })
        newData.save();

        const embed = new Discord.MessageEmbed()
            .setColor("#d000a8")
            .addField(`Daily`, `You got ${coinadd} coins from your daily claim.`)
            .setTimestamp()
        message.channel.send({ embed })
        return;
    }
    else {
        var lastclaimed = parseFloat(data.lastclaim)
        if (message.createdTimestamp - lastclaimed < 86400000) {
            message.channel.send(`Please wait ${humanizeDuration(86400000 - (message.createdTimestamp - lastclaimed))
                } before claiming again.`)
            return;
        }
        var myquery = { userID: message.author.id };
        let newcoins = data.coins + coinadd
        var newvalues = { $set: { coins: newcoins } };
        Coins.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            const embed = new Discord.MessageEmbed()
                .setColor("#d000a8")
                .addField(`Daily`, `You got ${coinadd} coins from your daily claim.`)
                .setTimestamp()
            message.channel.send({ embed })
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 0
};

exports.help = {
    name: 'daily',
    description: 'Claim your daily coins for the day!',
    usage: 'daily',
};