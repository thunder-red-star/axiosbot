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
    if (!user) return message.reply("You need to mention someone to slap them");
    if(user.id === "691009964570968144") return message.reply('You can\'t hurt him you plebord.');
    if (user.id == client.user.id && message.author.id === "691009964570968144"){
      const { body } = await superagent
      .get("https://nekos.life/api/v2/img/slap");
      
      const embed = new Discord.MessageEmbed()
      .setColor("#ff9900")
      .setTitle(`No u! *slaps* ${message.author.username}`)
      .setImage(body.url) 
      return message.channel.send({embed})
    }else if (user.id == client.user.id && message.author.id !== "691009964570968144"){
      return message.channel.send("NUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU **owwie**")
    }
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${user.username} You got slapped by ${message.author.username}`)
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
    name: 'slap',
    description: 'Slaps someone OwO',
    usage: 'slap'
  };