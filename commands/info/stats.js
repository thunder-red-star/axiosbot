const Discord = require('discord.js')
const settings = require('../../settings.json');
const fs = require('fs');
const osutils = require('os-utils');
const version = require('../../package.json')
const Eris = require('eris')

exports.run = async (client, message, tools) => {
      let totalusers = 0
      let commandcollection = client.commands
      let totalcmds = commandcollection.array().length
    client.guilds.cache.array().forEach(guild =>{
        totalusers += guild.memberCount
      })
      let totalchannels = await client.channels.cache.size
      let totalservers = await client.guilds.cache.size
  var milliseconds = parseInt((client.uptime % 1000) / 100),
  seconds = parseInt((client.uptime / 1000) % 60),
  minutes = parseInt((client.uptime / (1000 * 60)) % 60),
  hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
  days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
  days = (days < 10) ? "0" + days : days;
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  fs.readdir('./commands/', async (err, files) => {
    if (err) console.error(err);
    totcmds = files.length;

    const prefixs = require("../../models/settings.js")
    prefixs.findOne({
      guildID: message.guild.id
    }, (err, srid) => {
      let globalprefix = settings.prefix;
      osutils.cpuUsage(async function(v) {
        const embed = await new Discord.MessageEmbed()
        .setColor("#0174c3")
        .setTitle('Stats for Axios')
        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setTimestamp()
        .addField("Global Prefix", globalprefix, true)
        .addField("Total Commands", `${totalcmds} commands`, true)
        .addField("Total Servers", `${totalservers}`, true)
        .addField("Total Channels", `${totalchannels}`, true)
        .addField("Total Users", `${totalusers}, ${client.users.cache.size} cached users`, true)
        .addField("Bot Version", version["version"], true)
        .addField("Library", "Discord.js v12", true)
        .addField("Developer", `ThunderRedStar`, true)
        .addField("Platform", osutils.platform(),true)
        .addField("VPS CPU Cores", osutils.cpuCount() + " Cores",true)
        .addField("Total Memory", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
        .addField("RAM Usage Of VPS", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + ( osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`,true)
        .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
        .addField("RAM Usage Of VPS %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`,true)
        .addField("Ping", Math.round(client.ws.ping) + "ms", true)
        .addField("Uptime", days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", true)
        .setFooter(`Axios`);
        message.channel.send({embed});
      })
    })
  })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  cooldown: 10,
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Displays bot\'s stats.',
  usage: 'stats'
};
