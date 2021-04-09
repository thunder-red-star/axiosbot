const Discord = require('discord.js');
const superagent = require('superagent');
exports.run = async (client, message, args, tools) => {
    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.cache.get(userid)
        if (user === undefined) {
            message.channel.send("Please provide an actual mention or id!")
        }
    }
    if (!user) return message.reply("You need to mention someone to feed them!");
    if (user.id == client.user.id) return message.reply("Baka you know bots don't eat >///< Now give me more RAM :3")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/feed");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`${user.username}, you got fed by ${message.author.username} OwO`)
    .setImage(body.url) 
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    cooldown: 5
  };
  
  exports.help = {
    name: 'feed',
    description: 'Feeds someone OwO',
    usage: 'feed'
  };