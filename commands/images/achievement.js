const Discord = require('discord.js'),
  AlexAPI = require('alexflipnote.js'),
  settings = require('../../settings.json'),
  AlexClient = new AlexAPI(process.env.apitoken);

exports.run = async (client, message, args) => {
  let avatar = message.content.split(" ").slice(1, 2),
    text = message.content.split(" ").slice(2).join(" "),
    link = await AlexClient.image.achievement({text: text})
await message.channel.send({files: [{ attachment: link }]});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
  };
  
  exports.help = {
    name: 'achievement',
    description: 'Makes a minecraft achievement',
    usage: 'achievement <url> text'
  };
   
