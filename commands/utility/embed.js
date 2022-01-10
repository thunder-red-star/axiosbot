const Discord = require("discord.js")

exports.run = (client, message) => {
    let message1 = message.content
    let argsthing = message1.split(" ").slice(1).join(" ")
    console.log(argsthing)
    let args = argsthing.split("|")
    let embed = new Discord.MessageEmbed()
        .setTitle(args[0])
        .setDescription(args[1])
        .setFooter(args[2])
        .setColor(args[3] || "#36393f")
    message.channel.send({embed: embed}).then(() => {
        message.delete()
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'embed',
    description: 'Embeds a message',
    usage: 'embed <title>|<description>|<footer>|<color>'
};
