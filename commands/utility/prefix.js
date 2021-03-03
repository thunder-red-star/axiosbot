const Discord = require('discord.js'),
  superagent = require('superagent'),
  mongoose = require('mongoose'),
  settings = require('../../models/settings.js')

exports.run = async (client, message, args, tools) => {
    if (!args[0]) {
        const Settings = require('../../models/settings.js'),
          data = await Settings.findOne({
            guildID: message.guild.id
        });
        if (!data) {
            message.channel.send('This guild has no settings, but the prefix is c!')
            let newData = new Settings({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                prefix: "c!",
            })
            newData.save();
        }
        else {
        return message.reply(`The current prefix for ${message.guild.name} is ${data.prefix}`)}
    } else {
        const Settings = require('../../models/settings.js'),
          data = await Settings.findOne({
            guildID: message.guild.id
        });
        if (!data) {
            message.channel.send('This guild has no settings, please wait while I create some with your prefix...')
            let newData = new Settings({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                prefix: args[0],
            })
            newData.save();
            let successEmbed = new Discord.MessageEmbed()
                .setTitle('Prefix')
                .setColor("#d000a8")
                .setDescription(`Success! The prefix for ${message.guild.name} is now \`${args[0]}\``)
                message.channel.send(successEmbed)
        } else {
            var myquery = { guildID: message.guild.id },
              newvalues = { $set: { prefix: args[0] } };
            Settings.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                let successEmbed = new Discord.MessageEmbed()
                .setTitle('Prefix')
                .setColor("#d000a8")
                .setDescription(`Success! The prefix for ${message.guild.name} is now \`${args[0]}\``)
                message.channel.send(successEmbed)
            });
        }

    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 4
};

exports.help = {
    name: 'prefix',
    description: 'Sets the prefix of your server, or returns it',
    usage: 'prefix (string)',
};