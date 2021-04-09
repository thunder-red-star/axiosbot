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
    if (!user) return message.reply("You need to mention someone to kiss them :3");
    if (user.id == client.user.id && message.author.id !== "691009964570968144") return message.reply("No kissing unless you're my Dev :<")
    if (user.id == message.author.id) return message.reply("Idk if that's possible chief")

    const { body } = await superagent
    .get("https://nekos.life/api/kiss");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`${message.author.username} kissed ${user.username} >:3`)
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
    name: 'kiss',
    description: 'Kisses someone OwO',
    usage: 'kiss'
  };