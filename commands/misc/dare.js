let dares = require("../../assets/dares.json")

exports.run = (client, message) => {
    return message.channel.send(dares[Math.floor(Math.random() * dares.length)])
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: "dare",
    description: "Gives a random DARE from truth / dare.",
    usage: "dare"
};
