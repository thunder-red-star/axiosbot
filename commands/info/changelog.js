const Discord = require('discord.js');
const superagent = require('superagent');
const fs = require('fs')


const changelogArray = [
    "1.0.1",
    "1.0.0",
    "0.0.0"
];


exports.run = async (client, message, args, tools) => {
    let text = ""
    if (args[0]) {
        let index = changelogArray.indexOf(args[0].toString()) + 1
        const data = fs.readFileSync('changelog.md', 'utf8')
        let data1 = data.toString()
        let data2 = data1.split("##").slice(index - 1, 1)
        text += data2
    }
    else {
        const data = fs.readFileSync('changelog.md', 'utf8')
        let data1 = data.toString()
        let data2 = data1.split("##").slice(1, 2)
        text += data2

    }
    let changelogEmbed = new Discord.MessageEmbed()
    .setTitle('Latest Patch Notes for CommandStorm')
    .setDescription(text)
    .setColor("#d000a8")
    .setTimestamp()
    message.channel.send(changelogEmbed)
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    cooldown: 30,
    permLevel: 0
};

exports.help = {
    name: 'changelog',
    description: 'Returns the patch notes for the specific version.',
    usage: 'changelog <version>',
    example: 'changelog 1.0.0 (returns patch notes for this version)'
};