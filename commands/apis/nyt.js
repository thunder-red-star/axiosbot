const Discord = require('discord.js');
AlexAPI = require('alexflipnote.js');
settings = require('../../settings.json');
AlexClient = new AlexAPI(process.env.apitoken);
const axios = require('axios');
  Pagination = require('discord-paginationembed');




exports.run = async (client, message, args) => {
    var embeds = [];

    const newsjson = await axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.nytapi}`);

    newsjson.data.results.forEach((item) => {
        embeds.push(new Discord.MessageEmbed().setURL(item.url).setTitle(item.title).setDescription(item.abstract + "\n\n" + item.byline + `\n\nSection: ` + item.section).setImage(item.thumbnail_standard))
    });
    new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .setThumbnail('https://www.slixa.com/static/blog-articles/as-seen-in/new-york-times-logo-white.png')
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
    name: 'nyt',
    description: 'Gets recent articles from the New York Times',
    usage: 'nyt'
};

