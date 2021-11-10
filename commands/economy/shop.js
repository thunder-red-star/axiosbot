const Discord = require('discord.js'),
  superagent = require('superagent'),
  mongoose = require('mongoose'),
  Coins = require('../../models/coins.js'),
  copypastas = require('../../assets/shopitems.json'),
  Pagination = require('discord-paginationembed');
  


exports.run = async (client, message, args, tools) => {
    var embeds = [];

    copypastas.forEach((item) => {
        embeds.push(new Discord.MessageEmbed().addField(item.name, `ID: \`${item.id}\`\nDescription: \`${item.description}\`\nCost: ${item.cost} coins`, true))
    });

    new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .setTitle('Shop')
        .setDescription('Buy an item with \`buy <id>!\`')
        .setTimestamp()
        .setColor("#0174c3")
        .build();

};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
};

exports.help = {
    name: 'shop',
    description: 'Opens the shop so you can buy stuff.',
    usage: 'shop',
};