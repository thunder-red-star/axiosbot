const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let pingEmbed = new Discord.MessageEmbed()
    .setTitle("Pong")
    .setDescription(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
    .setTimestamp()
    .setColor("#d000a8")
    message.channel.send(pingEmbed)

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
  };
  
  exports.help = {
    name: 'ping',
    description: 'I wonder what this does... 🤦‍♂️',
    usage: 'ping',
  };