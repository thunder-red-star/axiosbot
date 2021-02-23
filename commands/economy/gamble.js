const mongoose = require("mongoose")
exports.run = (client, message, args) => {
    const Coins = require('../../models/coins.js')
    let user = message.author
    Coins.findOne({
        userID: user.id
    }, (err, coins) => {
        if (!coins) {
            let newcoins = new Coins({
                _id: mongoose.Schema.Types.ObjectId,
                userID: user.id,
                coins: 0,
                lastdaily: 0,
                bank: 0,
                capacity: 1000
            })
            newcoins.save()
            message.channel.send(`Baka <@${user.id}>, you don't have any coins yet. Start off with \`daily\` :<`)
        } else {

            let money = args[0]
            if (!money) {
                money = 10;
            }
            if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Valid numbers only! (or do you think you can bet with letters, you baka)`);
            if (money > 2500) return message.reply("Due to disgusting abusers of the casino, you can only bet max 2500 coins ;-;")
            if (parseInt(coins.coins) < money) return message.channel.send(`**${message.author.username}** Scrub you don't even have that much ***smug face***`);

            let random = Math.floor(Math.random() * 100);

            if (random == 0) { //1%
                money *= 10
                let curBal1 = parseInt(coins.coins)
                coins.coins = curBal1 + money;
                coins.save()
                message.channel.send(`🎲 | **${message.author}**, <a:tada5:813424852454998066>
 **JACKPOT** You won **${money}** coins! GGWP! <a:tada5:813424852454998066>
`);
            } else if (random % 20 == 1) { //4%
                money = money * 5
                let curBal2 = parseInt(coins.coins)
                coins.coins = curBal2 + money
                coins.save()
                message.channel.send(`🎲 | GGWP! **${message.author.username}**, You won **${money}** coins in addition to what you had. <a:tada4:813424852429438987>
`);
            } else if (random % 5 == 4) { //20%
        money = money * 2
        let curBal2 = parseInt(coins.coins)
        coins.coins = curBal2 + money
        coins.save()
        message.channel.send(`🎲 | GGWP! **${message.author.username}**, You won **${money}** coins in addition to what you had. <a:tada2:813424852521189435>

`);
    } else { // Lost
        let curBal5 = parseInt(coins.coins)
        coins.coins = curBal5 - money;
        coins.save()
        message.channel.send(`🎲 | **${message.author.username}**, sadly you lost **${money}** coins. Better luck next time :< <a:tada1:813424852475838495>
`);
    }
}
  })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 30,
    permLevel: 0
};

exports.help = {
    name: 'gamble',
    description: 'Gamble for a chance of winning more coins',
    usage: 'gamble <amount>'
};