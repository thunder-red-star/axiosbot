const chalk = require('chalk');
const Discord = require("discord.js");
const fs = require("fs")
const slash = [];

module.exports = client => {
    client.user.setActivity(`${client.guilds.cache.size} servers  ⋙ a!help`, { type: 'COMPETING' })
    setInterval(() => {
        client.user.setActivity(`${client.guilds.cache.size} servers ⋙ a!help`, { type: 'COMPETING' })
    }, 20000);

    console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.cache.size} servers.`));
    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    client.guilds.cache.forEach((guild) => {
        if (!blacklist[guild.ownerID]) {
            return;
        } else {
            channel = guild.channels.cache.get(guild.systemChannelID || channelID)
            if (blacklist[guild.ownerID].state === true) {
                channel.send("The guild owner is blacklisted, so bye!")
                guild.leave(guild.id)
            }
        }
    })
    const interactions = fs.readdirSync("./interactions").filter((file) => file.endsWith(".js"))
    for (const files of interactions) {
        const file = require(`../interactions/${files}`);
        slash.push(file);
        client.api.applications(client.user.id).guilds('728278581939142678').commands.post({ data: file.data })
    };
    client.ws.on('INTERACTION_CREATE', async (i) => {
        const command = slash.find(cmd => cmd.data.name === i.data.name.toLowerCase())
        if (command) command.execute(client, send, i);
    })
    async function send(interaction, content) {
        return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: await msg(interaction, content),
            },
        });
    };
    async function msg(i, c) {
        const m = await Discord.APIMessage.create(client.channels.resolve(i.channel_id), c)
            .resolveData()
            .resolveFiles();

        return { ...m.data, files: m.files }
    }
};
