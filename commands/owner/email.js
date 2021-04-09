exports.run = async (client, message, args) => {
	const mailgun = require('mailgun-js');
	const domain = process.env.domain;
	const mg = mailgun({ apiKey: process.env.key, domain: domain });
	const email = args[0].toString()
	const subject = message.content.split("|").slice(1,2).join("")
	const text = message.content.split("|").slice(2).join("")
	const data = {
		from: 'thunderredstar <me@thunderredstar.me>',
		to: email,
		subject: subject,
		text: text
	};
	if (message.author.id != '691009964570968144') {
        message.channel.send('You scrub, what made you think you\'d be able to do that??');
        console.log(`${message.author.username} the plebord is trying to use owner commands`);
        return;
    }
	console.log(email)
	console.log(subject)
	console.log(text)
	await mg.messages().send(data, function(error, body) {
		message.channel.send(JSON.stringify(body)
		)
	});
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	permLevel: 5
};

exports.help = {
	name: 'email',
	description: 'email someone, owner only',
	usage: 'email <address> <subject> <text>'
};
