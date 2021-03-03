const Discord = require('discord.js'),
  superagent = require('superagent'),
  mongoose = require('mongoose'),
  Coins = require('../../models/coins.js');

exports.run = async (client, message, args, tools) => {
    if (!args[0]) {
        return message.channel.send('You have to mention someone to set their coins!')
    }
    if (!args[1]) {
        return message.channel.send('You have to give them an actual number of coins!')
    }
    else {
        const data = await Coins.findOne({
            userID: message.mentions.users.first().id
        });
        if (!data) {
            message.channel.send('Creating records for that person...')
            let newData = new Coins({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                coins: args[1],
                lastclaim: 0,
                bank: 0,
                capacity: 1000
            })
            newData.save();
        }
        else {
            var myquery = { userID: message.author.id };
            let newcoins = args[1]
            var newvalues = { $set: { coins: newcoins } };
            Coins.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                const embed = new Discord.MessageEmbed()
                    .setColor("#d000a8")
                    .addField(`Set Coins`, `The user ${message.mentions.users.first().tag}'s coins were set to ${args[1]}`)
                    .setTimestamp()
                message.channel.send({ embed })
            });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 5
};

exports.help = {
    name: 'setcoins',
    description: 'Sets coins for someone.',
    usage: 'setcoins @mention <number>',
};