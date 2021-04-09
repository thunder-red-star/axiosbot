const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
//const mysql = require('mysql');
//const file = require('../mysql.json');
exports.run = async (client, message, args) => {
    let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.cache.get(userid)
        if (user === undefined) {
            message.channel.send("Please provide an actual mention or id!")
        }
    }
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    //let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
    if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');

    //if (!logchannel) return message.channel.send('I cannot find a logs channel');
    if (reason.length < 1) reason = 'No reason supplied.';

    if (!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
        warns: 0
    };

    warns[`${user.id}, ${message.guild.id}`].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
        if (err) throw err;
    });

    const embed = new Discord.MessageEmbed()
        .setColor(0xFFFF00)
        .setTimestamp()
        .addField('Action:', 'Warning')
        .addField('User:', `${user.username}#${user.discriminator}`)
        .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Number of warnings:', warns[`${user.id}, ${message.guild.id}`].warns)
        .addField('Reason', reason)
        .setTimestamp()
    let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
    if (!logchannel) {
        message.channel.send({ embed })
    } else {
        client.channels.cache.get(logchannel.id).send({ embed });
        message.channel.send({ embed })
    }
    if (user.bot) return;
    message.mentions.users.first().send({ embed }).catch(e => {
        if (e) return
    });


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["smolyeet"],
    permLevel: 0,
    cooldown: 1
};

exports.help = {
    name: 'warn',
    description: 'Issues a warning to the mentioned user.',
    usage: 'warn [mention] [reason]'
};