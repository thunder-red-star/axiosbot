const Discord = require('discord.js');
const AlexAPI = require('alexflipnote.js');
const settings = require('../../settings.json');
const AlexClient = new AlexAPI(process.env.apitoken);

exports.run = async (client, message, args) => {
  let avatar = message.content.split(" ").slice(1, 2)
  let text = message.content.split(" ").slice(2).join(" ")
  let link = await AlexClient.image.achievement({text: text})
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
   
