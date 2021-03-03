const chalk = require('chalk');
module.exports = client => {
  client.user.setActivity(`${client.guilds.cache.size} servers  ⋙ c!help`, { type: 'WATCHING' })
  setInterval(() => {
    client.user.setActivity(`${client.guilds.cache.size} servers ⋙ c!help`, { type: 'WATCHING' })
  },20000);

  console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.cache.size} servers.`));
  
};
