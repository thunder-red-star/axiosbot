const Discord = require("discord.js")

module.exports = {
    data: {
        name: "say",
        description: "Say something",
        options: [{
            name: "message",
            description: "whatever you want to send",
            type: 3,
            required: true
        }]
    },
    async execute(client, send, i) {
        var args = i.data.options
        console.log(args)
        var text = args.find(args => args.name.toLowerCase() === "message").value;
        await send(i, text)

    }
}