const Discord = require('discord.js');
const pollEmbed = require('discord.js-poll-embed');

exports.run = async (client, message, args) => {
  const title1 = message.content.split("|").slice(1, 2);
  const options1 = message.content.split("|").slice(2, 3);
  const optionsstring = options1.toString();
  const optionslist = optionsstring.split(",");
  const timeout1 = message.content.split("|").slice(3, 4);
  pollEmbed(message, title1, optionslist, timeout1)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    cooldown: 5
  };

  exports.help = {
    name: 'poll',
    description: 'poll!',
    usage: 'poll'
  };
