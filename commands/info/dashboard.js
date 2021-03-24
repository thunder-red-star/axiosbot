const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let inviteEmbed = new Discord.MessageEmbed()
    .setColor("#d000a8")
    .setTitle('CommandStorm')
    .setDescription(`[Dashboard](https://dashboard.williamvongphan.repl.co)`)
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
    name: 'invite',
    description: 'Returns an invite link for the bot.',
    usage: 'invite',
    example: 'invite (returns a link to invite bot)'
  };