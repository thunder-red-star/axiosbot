const Discord = require('discord.js');
AlexAPI = require('alexflipnote.js');
settings = require('../../settings.json');
AlexClient = new AlexAPI(process.env.apitoken);
const axios = require('axios');
  Pagination = require('discord-paginationembed');




exports.run = async (client, message, args) => {
var embeds = [];
    const lyrics = await axios.get(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(message.content.split(" ").slice(1).join(" "))}`);
    let brokenlist = []
    console.log(lyrics.data)
    let brokenlyrics = lyrics.data.lyrics.replace(/\n\n/g,"").split("\n")
    for (x=0;x<brokenlyrics.length;x+=4) {brokenlist.push(brokenlyrics.slice(x,x+4).join("\n"))}
    embeds.push(new Discord.MessageEmbed().setTitle("Lyrics for " + lyrics.data.author + " - " + lyrics.data.title).setDescription("Note: the lyrics were broken up into verses of 4 lines each to make sure that it fits in the embed" + "\n\nUse the reactions below to switch pages!\n\n" + "Link: " + lyrics.data.links.genius))
    brokenlist.forEach((item) => {
        embeds.push(new Discord.MessageEmbed().setTitle("Lyrics for " + lyrics.data.author + " - " + lyrics.data.title).setDescription(item))
    });
    new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .setThumbnail(lyrics.data.thumbnail.genius)
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
    name: 'lyrics',
    description: 'Gets lyrics of a song',
    usage: 'lyrics <song name>'
};

