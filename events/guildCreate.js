const Discord = require('discord.js'),
  settings = require('../settings.json');
  const Settings = require('../models/settings.js');
  const mongoose = require('mongoose');
  
module.exports = guild => {
  let owner = guild.ownerID,
    channel = guild.channels.cache.get(guild.systemChannelID || channelID),
    joinEmbed = new Discord.MessageEmbed()
  .setTitle("CommandStorm")
  .setDescription(`Hello ${guild.name}, thanks for inviting me to this server! My default prefix is c!, however, you can use the command ${settings.prefix}prefix to set a new prefix!`)
  .setFooter()
  channel.send(joinEmbed)
      let newData = new Settings({
      _id: mongoose.Types.ObjectId(),
      guildID: guild.id,
      prefix: "c!",
    })
    newData.save();
}
