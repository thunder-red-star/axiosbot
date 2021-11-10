const Discord = require('discord.js');
AlexAPI = require('alexflipnote.js');
settings = require('../../settings.json');
AlexClient = new AlexAPI(process.env.apitoken);
const axios = require('axios');
Pagination = require('discord-paginationembed');




exports.run = async (client, message, args) => {
    let data = await axios.get("https://api.kanye.rest/")
    const embed = new Discord.MessageEmbed()
    .setTitle("Ask Kanye")
    .setDescription("Kanye: \""+data.data.quote +"\"")
    .setThumbnail("https://th.bing.com/th/id/OIP.xE511wAWKKbAmeZwqfpRJgHaE7?pid=ImgDet&rs=1")
    .setColor("#FFFFFF")
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 10,
    permLevel: 0
};

exports.help = {
    name: 'askkanye',
    description: 'Kanye will tell you what he thinks.',
    usage: 'askkanye'
};

