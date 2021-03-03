const Discord = require('discord.js');
const superagent = require('superagent');
const request = require('request');

exports.run = async (client, message, args, tools) => {
  let mentioned = message.mentions.users.first();
    let mentionedGuildMember = message.mentions.members.first();
    let firstArg = args.shift();
    let sayContent = args.join(" ");
    if(mentioned == undefined){
      return message.channel.send('You must mention a user to pretend to be them! Or are you gonna pretend to be thin air?');
    };
    if(mentioned.id == 1){return}
    message.channel.createWebhook(`sayas`, {
      avatar: `https://cdn.discordapp.com/avatars/${mentioned.id}/${mentioned.avatar}.png?size=128`,
      reason: `pretend command`
    }).then((webhook) =>{
      webhook.send(sayContent, {
        username: mentionedGuildMember.displayName
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
