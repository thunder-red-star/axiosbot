const moment = require('moment');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let inline = true
    let userid = message.content.split(" ").slice(1, 2).join("")
    user = await client.users.fetch(userid)
    if (user === undefined) {
        user = message.member.user
    }

    let embed = new Discord.MessageEmbed()
        .setImage((user.displayAvatarURL()))
        .setColor("#0174c3")
        .addField("Full Username", `${user.tag}`, inline)
        .addField("ID", user.id, inline)
        .addField("Bot?", `${user.bot}`, inline, true)
        .addField("Joined Discord At", user.createdAt)
        .setFooter(`Information about ${user.username}`)
        .setTimestamp()

    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["userstats"],
    permLevel: 0,
    cooldown: 5
};

exports.help = {
    name: 'unknownuserinfo',
    description: 'Displays information about a user.',
    usage: 'unknownuserinfo <@user>'
};
