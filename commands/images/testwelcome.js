const Discord = require('discord.js'),
AlexAPI = require('alexflipnote.js'),
settings = require('../../settings.json'),
AlexClient = new AlexAPI(process.env.apitoken);
const Canvas = require("canvas")
Canvas.registerFont('./assets/Poppins.ttf', { family: 'Poppins' })


exports.run = async (client, message, args) => {
    let member = message.author;
    let channel = message.channel;
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./assets/wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '31px Poppins';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
    ctx.font = '40px Poppins';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${message.author.username}!`, canvas.width / 2.5, canvas.height / 1.8);
        ctx.font = '24px Poppins';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`We have ${message.guild.memberCount} users now!`, canvas.width / 2.5, canvas.height / 1.2);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${message.author.username}!`, attachment);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: 'testwelcome',
    description: 'test the welcomer',
    usage: 'testwelcome'
};

