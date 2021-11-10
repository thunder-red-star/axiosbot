const { ShardingManager } = require('kurasuta');
const { join } = require('path');

const { BaseCluster } = require('kurasuta');

const Discord = require("discord.js"),
    client = new Discord.Client(),
    keepAlive = require('./server.js'),
    settings = require('./settings.json'),
    mongoose = require('mongoose'),
    chalk = require('chalk');
const Topgg = require("@top-gg/sdk");
var express = require('express');
var phin = require('phin')
var app = express();
var config = require('./config.json')
const Coins = require('./models/coins.js')

const webhook = new Topgg.Webhook("discord");
modules = [
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
],
    fs = require("fs");

require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection(),
    client.aliases = new Discord.Collection();

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

mongoose.connect(`mongodb+srv://compass:${process.env.mongodbpass}@commandstorm.7zq2c.mongodb.net/DiscordDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
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

var webhookurl = config.webhookurl,
    bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.send("dis is not a website kthx");
});

app.post("/hook", async function(req, res) {
    if (req.headers.authorization !== config.auth) return res.send({ code: "invalid auth" });
    var user_id = req.body.user;
    var bot = req.body.bot;
    const author = await client.users.fetch(user_id)
    let newcoin = Math.floor(Math.random() * 200 + 900)
    author.send("Thanks for voting! You recieved " + newcoin + " coins!")
    const channel = client.channels.cache.get('811112730702118912')
    channel.send(author.tag + " voted!")
    await Coins.findOne({
        userID: user_id
    }, (err, coins) => {
        let currentcoins = coins.coins

        if (!coins) {
            let newcoins = new Coins({
                _id: mongoose.Schema.Types.ObjectId,
                userID: user_id,
                coins: newcoin,
                lastdaily: 0,
                bank: 0,
                capacity: 1000
            })
            newcoins.save()
        } else {
            coins.coins = currentcoins + newcoin;
            coins.save()
        }
    });
    res.send({ code: "success" });
});

var listener = app.listen(30300, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});

keepAlive();
client.login(process.env.token);
