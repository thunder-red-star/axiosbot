const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let supportEmbed = new Discord.MessageEmbed()
    .setColor("#d000a8")
    .setTitle('CommandStorm')
    .setDescription(`[Support](https://discord.gg/thaDJhqn3k)`)
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
    name: 'support',
    description: 'Returns an support server for the bot.',
    usage: 'support',
    example: 'support (returns a link to support server)'
  };