const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!args[0]) return message.reply('Bruh, please give me a real suggestion, not thin air!');;
    if (args[0] === "bug") return message.reply("SUGGESTION! Not a bug...");
    content = args.join(" ");
    message.reply("Thanks for suggesting something!");
    let suggestEmbed = new Discord.MessageEmbed()
    .setColor("#0174c3")
    .setTitle('Axios')
    .setDescription(`${message.author.tag} (${message.author.id}) suggested:\n\`\`\`${content}\`\`\` \nin server ${message.guild.name}`)
    .setTimestamp()
    client.channels.cache.get('809487674112475181').send(suggestEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 120,
    permLevel: 0
  };
  
  exports.help = {
    name: 'suggest',
    description: 'Make a suggestion about the bot!',
    usage: 'suggest',
    example: 'suggest hi (sends a suggestion to my suggestion channel)'
  };