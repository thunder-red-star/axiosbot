const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let supportEmbed = new Discord.MessageEmbed()
    .setColor("#0174c3")
    .setTitle('About Axios')
    .setDescription(`This is a Discord bot made by ThunderRedStar and loosely based off [HarutoHiroki's Cryptonix X](https://github.com/HarutoHiroki/CryptonixX).`)
    .setTimestamp()
    message.channel.send(supportEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
  };
  
  exports.help = {
    name: 'about',
    description: 'Gives some info about bot.',
    usage: 'about',
  };