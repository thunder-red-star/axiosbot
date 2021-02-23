const Discord = require('discord.js');
const AlexAPI = require('alexflipnote.js');
const settings = require('../../settings.json');
const AlexClient = new AlexAPI(process.env.apitoken);

exports.run = async (client, message, args) => {
  let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
  let link = await AlexClient.image.deepfry({image: avatar})
message.channel.send({files: [{ attachment: link }]});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
  };
  
  exports.help = {
    name: 'deepfry',
    description: 'Deepfry someone',
    usage: 'deepfry (w or w/o @mention)'
  };
   
