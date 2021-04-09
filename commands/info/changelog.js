const Discord = require('discord.js'),
    superagent = require('superagent'),
    fs = require('fs'),
    changelogArray = [
        "1.0.1",
        "1.0.0",
        "0.0.0"
    ];


exports.run = async (client, message, args, tools) => {
    let text = ""
    let v;
    if (args[0]) {
        let index = parseInt(args[0])
        const data = fs.readFileSync('changelog.md', 'utf8')
        let data1 = data.toString(),
            data2 = data1.split("##").slice(index + 1, index + 2)
        if (data2 == "") {return message.channel.send("Invalid index!")}
        text += data2
        v = args[0].toString()

    }
    else {
        const data = fs.readFileSync('changelog.md', 'utf8')
        let data1 = data.toString(),
            data2 = data1.split("##").slice(1, 2)
        text += data2

    }
    let version = v || "0"
    let changelogEmbed = new Discord.MessageEmbed()
        .setTitle('Latest Patch Notes for CommandStorm')
        .setDescription(text + "\nThis version is " + version + " updates behind!")
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
    usage: 'changelog (optional: versions before)',
    example: 'changelog'
};