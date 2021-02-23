const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let emojiname = message.content.split(" ").slice(1, 2).join(" ")
    message.channel.send(emojiname)
    let emojilisten = message.guild.emojis.cache.get(emoji => emoji.name === emojiname) 
    let rname = message.content.split(",").slice(1, 2).join(" ");
    let embedmessage = message.content.split(",").slice(2).join(" ");
    let role = message.guild.roles.cache.find(val => val.name === rname);
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("❌ **Error:** I don't have the **Manage Roles** permission!");
    if (!role) return message.reply(`❌ **Error:** ${rname} isn't a role on this server!`);
    let botRolePosition = message.guild.member(client.user).roles.highest.position;
    let rolePosition = role.position;
    let userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition) return message.channel.send("❌ **Error:** I can\'t create this react role since the role you want to give is higher than your role!'")
    if (botRolePosition <= rolePosition) return message.channel.send("❌ **Error:** I can\'t create this react role since the role you want to give is higher than my role!");
    let reactroleEmbed = new Discord.MessageEmbed()
    .setTitle(`React with ${emojilisten} to get the \`${role}\` role!`)
    .setDescription(embedmessage)
    .setColor("#d000a8")
    .setTimestamp()
    await message.channel.send(reactroleEmbed).then(async msg => {
        message.react(emojilisten.id)
     // only collect reactions that are the role emojis
    const collector = msg.createReactionCollector(({emoji}) => emojilisten == (emoji.name))

    collector.on('collect', ({emoji, message}, user) => {
      message.guild.members.fetch(user).then(member => {
        member.roles.add(roles[emoji.name])
      })
    })

    collector.on('remove', ({emoji, message}, user) => {
      message.guild.members.fetch(user).then(member => {
        member.roles.remove(roles[emoji.name])
      })
    })
  })

}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["buff"],
  cooldown: 0,
  permLevel: 3
};

exports.help = {
  name: 'reactrole',
  description: 'Creates a react thing that allows you to give roles',
  usage: 'reactrole [role name (don\'t mention the role)] message '
};
