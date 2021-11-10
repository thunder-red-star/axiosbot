const utility = require('../../utils.js');
const { Util } = require('discord.js');
const settings = require('../../settings.json');

const Discord = require('discord.js');
var exec = require('child_process').exec;


function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = async (client, message, args) => {
    let filter = m => m.author.id == settings.ownerid;
    let shellcommand = new Discord.MessageCollector(message.channel, filter, { max: 1000, time: 1000000 });
    let string = "exec shell"
    let shell = await message.channel.send(`\`\`\`bash\n${string}\`\`\``)
    shellcommand.on('collect', m => {
        dir = exec(m.content, function(err, stdout, stderr) {
            m.delete()
            if (err) {
                string += "> " + m.content + "\n"
                string += err + "\n"
                shell.edit(`\`\`\`bash\n${string}\`\`\``)
            }
            if (m.content == "exit") {
                string += "> " + m.content + "\n"
                shellcommand.stop()
                message.channel.send("Shell terminated")
                return;
            }
            else {
                string += "> " + m.content + "\n"
                string += stdout + "\n"
                shell.edit(`\`\`\`bash\n${string}\`\`\``)
            }
        });

    })

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 5
};

exports.help = {
    name: 'shell',
    description: 'Makes a beta shell.',
    usage: 'shell'
};
