const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let inviteEmbed = new Discord.MessageEmbed()
    .setColor("#0174c3")
    .setTitle('Axios Dashhoard')
    .setDescription(`[Dashboard](https://dashboard.williamvongphan.repl.co)\n\nhaha this is a wip`)
    .setTimestamp()
    message.channel.send(inviteEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
  };
  
  exports.help = {
    name: 'dashboard',
    description: 'Returns a link to the dashboard',
    usage: 'dashboard',
    example: 'invite (returns a link to invite bot)'
  };