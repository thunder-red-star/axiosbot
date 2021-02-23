const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require('./server.js');
const settings = require('./settings.json');
const mongoose = require('mongoose');
const chalk = require('chalk');


require('./util/eventLoader')(client);


client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();

const modules = [
  "apis",
  "economy",
  "images",
  "info",
  "misc",
  "moderation",
  "music",
  "owner",
  "roleplay",
  "utility"
]; 

const fs = require("fs");

modules.forEach(c => {
  fs.readdir(`./commands/${c}/`, (err, files) => {
    if (err) throw err;
    console.log(`[Commandlogs] Loaded ${files.length} commands of module ${c}`);
    files.forEach(f => {
      const props = require(`./commands/${c}/${f}`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.name);
      });
    });
  });
});

mongoose.connect(`mongodb+srv://compass:${process.env.mongodbpass}@commandstorm.7zq2c.mongodb.net/DiscordDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true   }, err => {
    if (err) return console.error(err);
    console.log(chalk.bgGreen.black('Connected to MongoDB database!'));
});

client.elevation = message => {
  if (message.channel.type === 'dm') return;
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 3;
  if (message.member.id === message.guild.ownerID) permlvl = 4;
  if (message.author.id === settings.ownerid) permlvl = 5;
  return permlvl;
};

keepAlive();
client.login(process.env.token);