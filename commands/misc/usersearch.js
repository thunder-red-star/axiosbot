const Discord = require('discord.js');
AlexAPI = require('alexflipnote.js');
settings = require('../../settings.json');
AlexClient = new AlexAPI(process.env.apitoken);
const axios = require('axios');
Pagination = require('discord-paginationembed');




exports.run = async (client, message, args) => {
    var embeds = [];
    const member = message.content.split(" ").slice(1).join(" ")
    const members = message.guild.members.cache.filter(user => user.nickname == member || user.user.username == member);
    if (members == undefined) { return message.channel.send("Can't find " + member) }
    embeds.push(new Discord.MessageEmbed().setTitle("Usersearch for " + member).setDescription("Use the reactions below to switch pages!"))
    members.array().forEach((item) => {
        embeds.push(new Discord.MessageEmbed().setTitle("Usersearch for " + member).setDescription("Name: " + item.nickname + "\n" + "Username: " + item.user.tag + "\n" + "ID: " + item.user.id + "\n" + "Bot?: " + item.user.bot).setImage(item.user.avatarURL()))
    });
    new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .setTimestamp()
        .setColor("#0174c3")
        .build();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 10,
    permLevel: 0
};

exports.help = {
    name: 'usersearch',
    description: 'Searches for users out of the guild based off inputted name. Will be used as a base for future commands',
    usage: 'usersearch <username>'
};

