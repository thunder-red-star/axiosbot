const Discord = require('discord.js'),
    superagent = require('superagent'),
    fs = require('fs'),
    changelogArray = [
        "1.0.1",
        "1.0.0",
        "0.0.0"
    ];


exports.run = async (client, message, args, tools) => {
    let text = ""
    let changelogtext = fs.readFileSync('changelog.md', 'utf8').split("##").slice(1).join("##").split("##")
    
    
    let embeds = []
    changelogtext.forEach((item) => {
        embeds.push(new Discord.MessageEmbed().setDescription(item))
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
    enabled: false,
    guildOnly: false,
    aliases: [],
    cooldown: 30,
    permLevel: 0
};

exports.help = {
    name: 'changelog',
    description: 'Returns the patch notes for the specific version.',
    usage: 'changelog (optional: versions before)',
    example: 'changelog'
};