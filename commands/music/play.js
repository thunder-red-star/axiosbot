const Discord = require('discord.js');
const settings = require('../../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const music = require('../../music.js')
exports.run = async (client, message) => {
    const serverQueue = music.serverQueue(message.guild);
    //if (!serverQueue) {
    //	loop = false;
    //}else{
    //	loop = serverQueue.loop
    //}
    return message.channel.send("WIP")
    const args = message.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    //if (client.guild.voiceConnection)
    if (message.member.voice.channel) {
        message.member.voice.channel.join()
        const permissions = message.member.voice.channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await music.handleVideo(video2, message, message.member.voice.channel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
                    // eslint-disable-next-line max-depth
                    var response = await message.channel.createMessageCollector(message2 => parseInt(message2.content) > 0 && parseInt(message2.content) < 11, {
                        maxMatches: 1,
                        time: 10000,
                    });
                    response.on("collect", async m => {
                        response.stop()
                        const videoIndex = parseInt(m.content) || 1;
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    })

                } catch (err) {
                    console.error(err);
                    return message.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return music.handleVideo(video, message, message.member.voice.channel);
        }
    } else {
        return message.channel.send('I\'m sorry but you need to be in a voice channel to play musia!');
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'play',
    description: 'Play a song from YouTube.',
    usage: 'play (song name)'
};