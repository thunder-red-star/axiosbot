const moment = require('moment');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let inline = true
let presence = true
    let member = message.mentions.members.first();
    if (member === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        member = await message.guild.members.cache.get(userid)
        if (member === undefined) {
            member = message.member
        }
    }
  let target = message.mentions.users.first() || message.author;
  let embed = new Discord.MessageEmbed()
                .setThumbnail((target.displayAvatarURL))
    .setColor("#d000a8")
                .addField("Full Username", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Nickname", `${member.nickname !== null ? `${member.nickname}` : "He didn\'t change his nickname, what a plebord."}`, true)
                .addField("Bot?", `${target.bot}`,inline, true)
                .addField("Status", `${member.user.presence.status}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "He's not playing a game, what a plebord!"}`,inline, true)
                .addField("Roles", `${member.roles.cache.map(r => `${r}`).join(' | ') || "No Roles, how about you give him some you plebord!"}`, true)
                .addField("Can I moderate him?", `${member.manageable}`)
                .addField("Joined Discord At", member.user.createdAt)
                .setFooter(`Information about ${member.user.username}`)
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
  name: 'userinfo',
  description: 'Displays information about a user.',
  usage: 'userinfo <@user>'
};
