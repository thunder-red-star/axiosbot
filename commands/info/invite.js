const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let inviteEmbed = new Discord.MessageEmbed()
    .setColor("#0174c3")
    .setTitle('Axios')
    .setDescription(`[Invite](https://discord.com/oauth2/authorize?client_id=809175820340822056&scope=bot+applications.commands&guild_id=undefined&permissions=8)`)
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