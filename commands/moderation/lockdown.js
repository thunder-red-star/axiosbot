exports.run = (client, message, args) => {
  if (!client.lockit) client.lockit = [];
  //if (!message.member.hasPermission("MANAGE_CHANNELS")) return msg.reply("❌**Error:** You don't have the permission to do that!");
  client.lockit.push(message.channel.id)
  message.channel.createOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
		message.channel.send(`Channel is locked.`);
	})
  };
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ld'],
  permLevel: 2
};

exports.help = {
  name: 'lockdown',
  description: 'This will lock a channel down.',
  usage: 'lockdown'
};
