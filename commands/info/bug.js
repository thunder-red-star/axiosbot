const Discord = require('discord.js'),
  superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!args[0]) return message.reply('Bruh, please give me a real bug, not thin air!');;
    if (args[0] === "suggestion") return message.reply("BUG! Not a suggestion...");
    let content = args.join(" ");
    message.reply("Thanks for reporting a bug! Please don\'t spam this command.");
    let suggestEmbed = new Discord.MessageEmbed()
    .setColor("#0174c3")
    .setTitle('Axios')
    .setDescription(`${message.author.tag} (${message.author.id}) reported a bug:\n\`\`\`${content}\`\`\` \nin server ${message.guild.name}`)
    .setTimestamp()
    client.channels.cache.get('809487652654546965').send(suggestEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 120,
    permLevel: 0
  };
  
  exports.help = {
    name: 'bug',
    description: 'Make a suggestion about the bot!',
    usage: 'bug',
    example: 'bug this command is not working (sends a bug to my bug channel)'
  };