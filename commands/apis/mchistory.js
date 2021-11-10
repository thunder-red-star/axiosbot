const Discord = require('discord.js');
AlexAPI = require('alexflipnote.js');
settings = require('../../settings.json');
AlexClient = new AlexAPI(process.env.apitoken);
const axios = require('axios');
Pagination = require('discord-paginationembed');




exports.run = async (client, message, args) => {
    var embeds = [];
    const username = message.content.split(" ").slice(1).join(" ")
    const userinfo = await axios.get(`https://some-random-api.ml/mc?username=${username}`).catch(async (error) => {message.channel.send(username + " is not a nickname or that person hasn't registered for Minecraft yet.")}) ;
    if (userinfo.data.error == "currently this api is ratelimited. Please try again soon") { return message.channel.send(username + " is not a nickname or that person hasn't registered for Minecraft yet.") }
    embeds.push(new Discord.MessageEmbed().setTitle("Minecraft Name History for " + username).setDescription("UUID: " + userinfo.data.uuid + "\n\nUse the reactions below to switch pages!"))
    userinfo.data.name_history.forEach((item) => {
        embeds.push(new Discord.MessageEmbed().setTitle("Name History for " + username).setDescription("Name: " + item.name + "\n\n" + "Changed at: " + item.changedToAt))
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
    name: 'mchistory',
    description: 'Gets Minecraft name history for a specified user.',
    usage: 'mchistory'
};

