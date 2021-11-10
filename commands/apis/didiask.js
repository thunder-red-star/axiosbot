let axios = require("axios");

exports.run = async (client, message, args) => {
  let reply = "no"
  message.channel.send(reply)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 0
};

exports.help = {
    name: 'didiask',
    description: 'Checks if you asked.',
    usage: 'didiask'
};