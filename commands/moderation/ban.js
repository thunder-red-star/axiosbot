const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let reason = args.slice(1).join(" "),
    user = message.mentions.users.first();
  if (message.mentions.users.size < 1)
    return message.channel
      .send("You must mention someone to ban them.")
      .catch(console.error);
  if (message.mentions.users.first().id === message.author.id)
    return message.channel.send(
      "I can't let you do that, self-harm is bad :facepalm:"
    );
  if (user.id === client.user.id)
    return message.channel.send(
      "You pleblord, how can you use a bot to ban itself? :joy:"
    );
  if (reason.length < 1) reason = "No reason supplied.";
  let botRolePossition = message.guild.member(client.user).roles.highest
    .position;
  let rolePosition = message.guild.member(user).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition)
    return message.channel.send(
      "❌ **Error:** Cannor ban that member because they have roles that are higher or equal to you."
    );
  if (botRolePossition <= rolePosition)
    return message.channel.send(
      "❌ **Error:** Cannor ban that member because they have roles that are higher or equal to me."
    );
  if (!message.guild.member(user).bannable) {
    message.channel.send(
      `I cannot ban that member. My role might not be high enough or it's an internal error.`
    );
    return;
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("#0174c3")
      .setTimestamp()
      .addField("Action", "Ban")
      .addField("User:", `${user.username}#${user.discriminator} (${user.id})`)
      .addField(
        "Banned by",
        `${message.author.username}#${message.author.discriminator}`
      )
      .addField("Reason", reason)
      .setFooter(`Axios`);
    //let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
    if (user.bot) return;
    message.mentions.users
      .first()
      .send(embed)
      .catch(e => {
        if (e) return;
      });
    message.guild.members.ban(user.id, { days: 7, reason: reason });
    let logchannel = message.guild.channels.cache.find(x => (x.name = "logs"));
    if (!logchannel) {
      message.channel.send(embed);
    } else {
      client.channels.cache.get(logchannel.id).send({ embed });
      message.channel.send(embed);
    }
    if (user.bot) return;
    message.mentions.users
      .first()
      .send(embed)
      .catch(e => {
        if (e) return;
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bigyeet"],
  cooldown: 0,
  permLevel: 2
};

exports.help = {
  name: "ban",
  description: "Bans the mentioned user.",
  usage: "ban [mention] [reason]"
};
