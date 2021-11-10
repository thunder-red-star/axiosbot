const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let inviteEmbed = new Discord.MessageEmbed()
    .setColor("#0174c3")
    .setTitle('Vote for Axios')
    .setDescription(`[Vote](https://top.gg/bot/809175820340822056/vote)`)
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
    name: 'vote',
    description: 'Returns an vote link for the bot.',
    usage: 'vote',
  };