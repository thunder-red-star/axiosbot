const Discord = require('discord.js');
const superagent = require('superagent');
const request = require('request');

exports.run = async (client, message, args, tools) => {
        let user = message.mentions.users.first();
        if (user == undefined) {
            let userid = message.content.split(" ").slice(1, 2).join("")
            user = await client.users.fetch(userid)
            if (user == undefined) {
                message.channel.send("Please provide an actual mention or id!")
            }
        }
    let firstArg = args.shift();
    let sayContent = args.join(" ");
    if(user == undefined){
      return message.channel.send('You must mention a user to pretend to be them! Or are you gonna pretend to be thin air?');
    };
    if(user.id == 1){return}
    message.channel.createWebhook(`${user.username}`, {
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`,
      reason: `pretend command`
    }).then((webhook) =>{
      webhook.send(sayContent, {
        username: user.username
      }).then(() =>{webhook.delete()});
      message.delete();
    });
    }


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5
  };

  exports.help = {
    name: 'pretend',
    description: 'pretend to be someone else (disabled for anyone else but owner)',
    usage: 'pretend <mention> <thing>'
  };
