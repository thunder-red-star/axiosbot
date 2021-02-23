const Discord = require('discord.js');
const settings = require('../settings.json');
const fs = require("fs");
const superagent = require('superagent');
const db = require('../database.json');
const mongoose = require('mongoose');
const Settings = require("../models/settings.js")
const humanizeDuration = require("humanize-duration");

const cooldowns = new Discord.Collection();

module.exports = async message => {


    let guildSettings = await Settings.findOne({
        guildID: message.guild.id
    })
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;


    let client = message.client;
    if (!guildSettings) {
        let prefix = settings.prefix;
        if (!message.content.startsWith(prefix)) return;
        let command = message.content.split(' ')[0].slice(prefix.length);
        let params = message.content.split(' ').slice(1);
        let perms = client.elevation(message);
        let cmd;


        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
            if (!cooldowns.has(cmd.help.name)) {
                cooldowns.set(cmd.help.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(cmd.help.name);
            const cooldownAmount = cmd.conf.cooldown * 1000 || 0;
if (message.author.id != settings.ownerid) {
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now);
                    return message.reply(`Please wait ${humanizeDuration(timeLeft)} before reusing the \`${command}\` command.`);
                }
            }}

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            if (perms < cmd.conf.permLevel) {
                console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
                return;
            }
            try {
                cmd.run(client, message, params, perms);
                message.react('811296394324869150')
                console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)

            }
            catch {
                console.log(error)
                message.react('811296689783832617')
            }
        }
        else { message.react('811294703626223687') }
    } else {
        let prefix1 = guildSettings.prefix;
        if (!message.content.startsWith(prefix1)) return;
        let command = message.content.split(' ')[0].slice(prefix1.length);
        let params = message.content.split(' ').slice(1);
        let perms = client.elevation(message);
        let cmd;


        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
            if (!cooldowns.has(cmd.help.name)) {
                cooldowns.set(cmd.help.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(cmd.help.name);
            const cooldownAmount = cmd.conf.cooldown * 1000 || 0;
if (message.author.id != settings.ownerid) {

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now);
                    return message.reply(`Please wait ${humanizeDuration(timeLeft)} before reusing the \`${command}\` command.`);
                }
            }}

            if (perms < cmd.conf.permLevel) {
                console.log(`Command: ${guildSettings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
                return;

            }
            try {

                cmd.run(client, message, params, perms);
                message.react('811296394324869150')
                console.log(`Command: ${guildSettings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)

                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
            catch (err) {
                console.log(err)
                message.react('811296689783832617')
            }
        } else { message.react('811294703626223687') }

    }


};
