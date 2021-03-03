const utility = require('../../utils.js');
const {Util } = require('discord.js');
const Discord = require('discord.js')

// if you don't use things get rid of them, they take up space (sorry if I sounded rude)
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, message, args) => {
    if (message.author.id != '691009964570968144')
    {
      message.channel.send('You scrub, what made you think you\'d be able to do that??');
      console.log(`${message.author.username} the plebord is trying to use owner commands`);
      return;
    }
    args = args.join(" ");
    try {
      let evaled = eval(args);
      let typeofoutput = typeof evaled
      if (typeofoutput !== "string"){
        evaled = require("util").inspect(evaled);}

      const codeblok = new Discord.MessageEmbed()
      .setColor('#00FF00')
      .setTitle('Output')
      .setDescription(`
        \`\`\`js\n${evaled}\`\`\``)
        .addField("Type", `\`\`\`js\n${typeofoutput}\`\`\``)
      message.channel.send(codeblok);
    }
catch (e) {
    message.react('811296689783832617')
  let error = e;
  const codeblok2 = new Discord.MessageEmbed()
  .setColor('#FF0000')
  .setTitle('Error')
  .setDescription(`
    \`\`\`js\n${error}\`\`\`
    `)
    message.channel.send(codeblok2);

}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  cooldown: 0,
  permLevel: 0
};

exports.help = {
  name: 'eval',
  description: 'Evaluates a JS string.',
  usage: 'eval'
};
