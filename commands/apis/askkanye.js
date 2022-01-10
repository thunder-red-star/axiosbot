const Discord = require('discord.js');

const axios = require('axios');




exports.run = async (client, message, args) => {
	let data = await axios.get("https://api.kanye.rest/")
	const embed = new Discord.MessageEmbed()
		.setTitle("Ask Kanye")
		.setDescription("Kanye: \"" + data.data.quote + "\"")
		.setThumbnail("https://th.bing.com/th/id/OIP.xE511wAWKKbAmeZwqfpRJgHaE7?pid=ImgDet&rs=1")
		.setColor("#FFFFFF")
	message.channel.send(embed)
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	cooldown: 10,
	permLevel: 0
};

exports.help = {
	name: 'askkanye',
	description: 'Kanye will tell you what he thinks.',
	usage: 'askkanye'
};

