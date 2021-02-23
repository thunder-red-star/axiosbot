exports.run = (client, message) => {
    let args = message.content.split(" ").slice(1);
    message.delete();
    if (message.content.includes("@everyone")  || message.content.includes("@here")) return message.channel.send("You ain't making me ping everyone BOI!");
    message.channel.send(args.join(" ")).cleanContent;
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: "say",
    description: "Makes the bot repeat your message.",
    usage: "say [message]"
};
