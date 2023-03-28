const start = new Date();
console.log('Ready...');
const config = require("./config.json");
const discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageAttachment, SelectMenuBuilder, ModalBuilder,ApplicationCommandType, AttachmentBuilder, codeBlock } = require('discord.js');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, VoiceConnectionStatus, AudioPlayerStatus, NoSubscriberBehavior, StreamType, AudioReceiveStream } = require('@discordjs/voice');
const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessageTyping,
        discord.GatewayIntentBits.DirectMessages,
        //discord.GatewayIntentBits.GuildBans,
        discord.GatewayIntentBits.GuildEmojisAndStickers,
        discord.GatewayIntentBits.GuildIntegrations,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildScheduledEvents,
        discord.GatewayIntentBits.GuildVoiceStates,
        //discord.GatewayIntentBits.GuildWebhooks,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.MessageContent
    ], partials: [
        discord.Partials.Channel,
        discord.Partials.GuildMember,
        discord.Partials.GuildScheduledEvent,
        discord.Partials.Message,
        discord.Partials.Reaction,
        discord.Partials.ThreadMember,
        discord.Partials.User
    ]
});
var radio = {};
var audio = {};
var ttsList = [];
var freetalkList = [];
const radioList = ["Nature 1", "Nature 2", "Nature 3", "Nature 4", "Nature 5", "ASMR 1", "ASMR 2","Music 1", "Music 2", "Music 3", "Music 4", "Music 5", "Jazz 1", "Jazz 2"];
const radioUrl = ["https://purenature-mynoise.radioca.st/stream", "https://maggie.torontocast.com:2020/stream/natureradiorain", "https://mpc2.mediacp.eu/stream/natureradiosleep", "http://air.radioart.com/fNature.mp3", "http://orion.shoutca.st:8157/stream", "https://drive.uber.radio/uber/asmrmouthsounds/icecast.audio", "https://drive.uber.radio/uber/asmrtapping/icecast.audio", "https://mediaserv38.live-streams.nl:18040/live"];
console.log("Loaded Discord...");
//Discord
const fs = require('fs');
const { request } = require('undici');
const requester = require("request");
//const puppeteer = require('puppeteer');
const { execSync , exec } = require("child_process");
const REST = require("rest");
const fetch = require('axios');
const whois = new require('whois');
const lyricsFinder = require('lyrics-finder');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const sess = {
    secret: 'secretsecretsecret',
    cookie: { 
		maxAge: 600000
	},
    resave: false,
    saveUninitialized: false,
};
const session = require('express-session');
const bodyParser = require('body-parser');
const Scraper = require('@yimura/scraper').default;
const youtube = new Scraper();
async function youtubeSearch(query) {
    const res = await youtube.search(query).then(results => {
        return results.videos;
    });
    return res;
}
const YoutubeMusicApi = require("youtube-music-api");
const { createCanvas, Image } = require('@napi-rs/canvas');
const tesseract = require("node-tesseract-ocr");
const ocrConfig = {
  lang: "eng",
  oem: 1,
  psm: 3,
};
const SpottyDL = require('spottydl');
const { SoundCloud } = require("scdl-core");
console.log("Loaded Internet packages...");
//Web API
const ms = require('ms');
const { readFile } = require('fs/promises');
const chatAi = require('api')('@writesonic/v2.2#4enbxztlcbti48j');
//system tool
const wait = require('node:timers/promises').setTimeout;
const readline = require('readline');
const readInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
const cpuStat = require('cpu-stat');
const pm2 = require('@pm2/io');
const pm2Ping = pm2.metric({
    name: 'Ping',
});
const ncs = require('nocopyrightsounds-api');
const ffmpeg = require('fluent-ffmpeg');
const gtts = require('node-gtts')('en');
const jpGtts = require('node-gtts')('ja');
//env
function generateTimeString() {
	return `${new Date().toLocaleString()}`;
}
function createInfo(title) {
	console.log(`[INFO]: ${title} [TIME]: ${generateTimeString()}`);
}
function createWarn(title) {
	console.log(`\x1b[41m[WARN]\x1b[49m: ${title} [TIME]: ${generateTimeString()}`);
}
var guildList = [];
var guildNameList = [];
client.on('ready', async () => {
    var now = new Date();
    console.log(`\x1b[46mBOT is now runnnig. Now version is ${currentVersion}. Boot time:${(now - start) / 1000}s\x1b[49m`);
    setInterval(() => {
        let ping = client.ws.ping;
        let speed = "";
        if (ping < 40) {
            speed = "Fast"
        } else if (ping > 40 && ping < 80) {
            speed = "Normal"
        } else if (ping > 80 && ping < 120) {
            speed = "Slow"
        } else {
            speed = "Heavy"
        }
        client.user.setActivity({
            name: `${ping}ms - ${speed} Supporting ${client.guilds.cache.size} guilds.`
        });
		const statusList = ["online", "idle", "dnd", "invisible"];
		client.user.setStatus(statusList[getRandomInt(0, 3)]);
        io.emit(ping, client.ws.ping);
        pm2Ping.set(client.ws.ping);
    }, 30000);
	SoundCloud.connect();
	for (const [key, value] of client.guilds.cache) {
  		guildList.push(key);
	}
	for (const [key, value] of client.guilds.cache) {
  		guildNameList.push(value["name"]);
	}
});
client.on('messageCreate', async msg => {
    console.log(`Content: ${msg.content} Author: ${msg.author.tag} Channel: ${msg.channel} Time: ${generateTimeString()}`);
    if (msg.author.bot) {
		return;
    }
    if (msg.channel.id === "1028891093544226928") {
        io.emit("dmgeted", msg.content, msg.author.tag, msg.author.id);
    }
});

client.on('interactionCreate', async(interaction) => {
	if (!interaction.isAutocomplete()) return;
	if(interaction.commandName === "queue" && interaction.options.getSubcommand() === "delete") {
		const focusedValue = interaction.options.getFocused();
		const filtered = audio[interaction.guild.id.toString()]["queue"].filter(choice => choice.startsWith(focusedValue));
		try {
			interaction.respond(
				filtered.map(choice => ({ name: choice, value: choice })),
			);
		} catch(err) {
			const rated = audio[interaction.guild.id.toString()]["queue"].slice(0, 24);
			const rateFilt = rated.filter(choice => choice.startsWith(focusedValue));
			interaction.respond(
					rateFilt.map(choice => ({ name: choice, value: choice })),
			);
		}
	}
	if(interaction.commandName === "radio" && interaction.options.getSubcommand() === "play") {
		const focusedValue = interaction.options.getFocused();
		const filtered = radioList.filter(choice => choice.startsWith(focusedValue));
		try {
			interaction.respond(
				filtered.map(choice => ({ name: choice, value: choice })),
			);
		} catch(err) {
			const rated = radioList.slice(0, 24);
			const rateFilt = rated.filter(choice => choice.startsWith(focusedValue));
			interaction.respond(
					rateFilt.map(choice => ({ name: choice, value: choice })),
			);
		}
	}
});

client.on('interactionCreate', async interaction => {
	if (interaction.commandName === "ping") {
        let ping = client.ws.ping;
        let speed = "";
        if (ping < 40) {
            speed = "Fast"
        } else if (ping > 40 && ping < 80) {
            speed = "Normal"
        } else if (ping > 80 && ping < 120) {
            speed = "Slow"
        } else {
            speed = "Heavy"
        }
        const embed = new EmbedBuilder()
			.setColor(config.config.color.info)
            .setTitle('Ping')
            .setTimestamp()
            .addFields(
                { name: 'Web Socket Ping', value: `${client.ws.ping}ms`, inline: true },
                { name: 'Message Delay', value: `Pinging...`, inline: true },
                { name: 'Status', value: `${speed}`, inline: true },
            );
        const rep = await interaction.reply({ content: "🏓 - Please wait, pinging...", embeds: [embed], fetchReply: true });
        const resultEmbed = new EmbedBuilder()
			.setColor(config.config.color.info)
            .setTitle('Ping')
            .setTimestamp()
            .addFields(
                { name: 'Web Socket Ping', value: `${client.ws.ping}ms`, inline: true },
                { name: 'Message Delay', value: `${rep.createdTimestamp - interaction.createdTimestamp}ms`, inline: true },
                { name: 'Status', value: `${speed}`, inline: true },
            );
		await interaction.editReply({ content: "🏓 - Pong!", embeds: [resultEmbed]});
    } if (interaction.commandName === "user") {
        await interaction.deferReply();
        const canvas = createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const background = await readFile('./wallpaper.jpg');
        const backgroundImage = new Image();
        backgroundImage.src = background;
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = '28px serif';
        context.fillStyle = '#ffffff';
        context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);
        context.font = applyText(canvas, `${interaction.member.displayName}`);
        context.fillStyle = '#ffffff';
        context.fillText(`${interaction.member.displayName}`, canvas.width / 2.5, canvas.height / 1.8);
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
        const avatar = new Image();
        avatar.src = Buffer.from(await body.arrayBuffer());
        context.drawImage(avatar, 25, 25, 200, 200);
        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
        interaction.editReply({ files: [attachment] });
    } if (interaction.commandName === "clear") {
        try {
            const num = interaction.options.getInteger('clear');
            const user = interaction.member;
            const messages = await interaction.channel.messages.fetch({ limit: num });
            await interaction.channel.bulkDelete(messages);
            await interaction.reply({ content: `Clear message number of ${num}`, ephemeral: true });
        } catch (err) {
            interaction.reply({ content: 'An error occurred when try to delete message', ephemeral: true });
        }
    } if (interaction.commandName === "whois") {
        try {
            const domain = interaction.options.getString('domain');
            whois.lookup(domain, function (err, data) {
                console.log(data);
                let content = data.slice(0, 2000);
                interaction.reply(content);
            });
        } catch (err) {
            interaction.reply({ content: "I'm sorry, Error with whois command.", ephemeral: true });
        }
    } if (interaction.commandName === "screenshot") {
        await interaction.reply('Taking screenshot...');
        var surl = interaction.options.getString('url');
        if (!surl.match("https") && !surl.match("http")) {
            surl = "https://" + surl;
        }
        var img;
        (async () => {
            //const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disabled-setuid-sandbox'], ignoreDefaultArgs: ['--disable-extensions'] });
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            try {
                await page.goto(surl, { waitUntil: 'networkidle2' });
                img = await page.screenshot({ path: "ss.png", fullPage: true });
                await browser.close();
                await interaction.editReply({ content: 'Screenshot Done', files: [img] });
            } catch (err) {
                console.log(err.stack);
                await interaction.editReply({ content: "Cannot take screenshot", ephemeral: true });
            }
        })();
    } if (interaction.commandName === "lyric") {
        await interaction.deferReply();
        const artist = interaction.options.getString('artist');
        const song = interaction.options.getString('song');
        (async function (artist, song) {
            let lyrics = await lyricsFinder(artist, song) || "I'm sorry, but the song not found.";
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Lyric')
                .setDescription(lyrics);
            await interaction.editReply({ content: `**${artist} - ${song}**\n\n`, embeds: [embed] });
        })(artist, song);
    } if (interaction.commandName === "pause" || interaction.customId === "pause") {
        await interaction.deferReply();
        const guildId = interaction.guild.id.toString();
		if (!audio[guildId]) {
			await interaction.editReply({ content: `Sorry, you are not playing any song.`, ephemeral: true });
			return;
		}
        if (!interaction.member.voice.channelId) { await interaction.editReply("Please connect voice channel."); return; }
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { await interaction.editReply("You are not in my voice channel."); return; }
        try {
            if(audio[guildId]["player"].pause()) {
				audio[guildId]["connection"].configureNetworking();
				await interaction.editReply(`Paused by ${interaction.user}`);	
			} else {
				await interaction.editReply({ content: `Sorry, you are not playing any song.`, ephemeral: true });
			}
        } catch (err) {
            await interaction.editReply("Cannot pause the audio.");
        }
    } if (interaction.commandName === "unpause" || interaction.customId === "unpause") {
        await interaction.deferReply();
        if (!interaction.member.voice.channelId) { await interaction.editReply("Please connect voice channel."); return; }
        const guildId = interaction.guild.id.toString();
		if (!audio[guildId]) {
			await interaction.editReply("There's no player that pausing right now.");
			return;
		}
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { await interaction.editReply("You are not in my voice channel."); return; }
        try {
            if(audio[guildId]["player"].unpause()) {
				audio[guildId]["connection"].configureNetworking();
            	await interaction.editReply(`Unpaused by ${interaction.user}`);
			} else {
				await interaction.editReply({ content: `Sorry, you are not playing any song.`, ephemeral: true });
			}
        } catch (err) {
            await interaction.editReply("Couldn't unpause audio resource");
        }
    } if (interaction.commandName === "stop" || interaction.customId === "stop") {
        await interaction.deferReply();
        if (!interaction.member.voice.channelId) { await interaction.editReply("Please connect voice channel."); return; }
        const guildId = interaction.guild.id.toString();
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { await interaction.editReply("You are not in my voice channel."); return; }
        try {
           	await audio[guildId]["player"].stop();
            await audio[guildId]["connection"].disconnect(audio[guildId]["player"]);
			audio[guildId]["resource"] = "";
			audio[guildId]["stream"].destroy();
            audio[guildId]["channel"] = "";
            audio[guildId]["previousChannel"] = "";
            audio[guildId]["id"] = "";
            const embed = new EmbedBuilder()
			.setColor(config.config.color.info)
        	.setAuthor({ name: ` | 👋 - Stopped playing`, iconURL: `${interaction.user.avatarURL({})}` });
            interaction.editReply({ embeds: [embed] });
        } catch (err) {
            interaction.editReply("Failed to stop music");
        }
    } if (interaction.commandName === "queue" && !interaction.isAutocomplete() || interaction.customId === "queue" && !interaction.isAutocomplete()) {
        await interaction.deferReply();
		const guildId = interaction.guild.id.toString();
		if(audio[guildId] === undefined || null) {
			const temp = { 
				[guildId]: {
            	"previousUser": "",
            	"previousChannel": "",
            	"stream": "",
            	"connection": "",
            	"title": "",
            	"artist": "",
            	"length": "",
            	"id": "",
            	"autoReplay": "false",
            	"player": "",
            	"musicPath": "",
            	"channel": "",
            	"queue": [],
            	"resource": "",
            	"volume": "",
            	"index": 0,
            	"previousPanel": "",
				"savedQueue": [],
        	}
			};
		audio = { ...audio, ...temp}
		}
        if (interaction.customId === "queue") {
            let content = "";
            if (audio[interaction.guild.id.toString()]["queue"].length === 0) {
                const embed = new EmbedBuilder()
                    .setColor(config.config.color.info)
                    .setTitle('Queue')
                    .setDescription("No music added to the queue.");
                await interaction.editReply({ embeds: [embed] });
            } else {
                content = audio[interaction.guild.id.toString()]["queue"].join("\n");
                const embed = new EmbedBuilder()
                    .setColor(config.config.color.info)
                    .setTitle('Queue')
                    .setDescription(content);
                await interaction.editReply({ embeds: [embed] });
            }
            return;
        }
        if (interaction.options.getSubcommand() === "display") {
            let content = "";
            if (audio[interaction.guild.id.toString()]["queue"].length === 0) {
                const embed = new EmbedBuilder()
                    .setColor(config.config.color.info)
                    .setTitle('Queue')
                    .setDescription("No music added to the queue.");
                await interaction.editReply({ embeds: [embed] });
            } else {
                content = audio[interaction.guild.id.toString()]["queue"].join("\n");
                const embed = new EmbedBuilder()
                    .setColor(config.config.color.info)
                    .setTitle('Queue')
                    .setDescription(content);
                await interaction.editReply({ embeds: [embed] });
            }
        } else if (interaction.options.getSubcommand() === "add") {
            let url = interaction.options.getString('url');
            try {
                const playlist = await ytpl(await ytpl.getPlaylistID(url));
                for (i = 0; i < playlist.items.length; i++) {
                    audio[guildId]["queue"].push(playlist.items[i].url);
                }
                await interaction.editReply(`Added ${playlist.items.length} items to queue.`);
                return;
            } catch (err) {
                if (ytdl.validateURL(url)) {
					if(await isValidVideo(url)) {
                    	audio[guildId]["queue"].push(url);
                    	await interaction.editReply(`Added ${url} to the queue.`);
                    	return;
					} else {
						await interaction.editReply("Please type accurate YouTube Video Link.");
					}
                } else {
                    await interaction.editReply("Your URL was invalid or not found.");
                    return;
                }
            }
        } else if (interaction.options.getSubcommand() === "delete") {
            try {
                let url = interaction.options.getString('url');
                let num = audio[interaction.guild.id.toString()]["queue"].indexOf(url);
                audio[interaction.guild.id.toString()]["queue"].splice(num, 1);
                await interaction.editReply(`Deleted ${url} from queue`);
            } catch (err) {
                await interaction.editReply({ content: "Cannot remove music from queue", ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() === "remove") {
            try {
                audio[interaction.guild.id.toString()]["queue"] = [];
                await interaction.editReply("Deleted all music");
            } catch (err) {
                await interaction.editReply('Cannot delete music');
            }
        } else if(interaction.options.getSubcommand() === "addrelate") {
			if(audio[guildId]["id"] === "" || audio[guildId]["id"] === null || audio[guildId]["id"] === undefined) {
				await interaction.editReply("Nothing to search here.");
				return;
			} else {
				const res = await youtubeSearch(`${audio[guildId]["artist"]}`);
				audio[guildId]["queue"].push(res[0]["link"], res[1]["link"]);
				await interaction.editReply(`Added ${res[0]["title"]} and ${res[1]["title"]} to the queue.`)
			}
		}
    } if (interaction.commandName === "youtube") {
        await interaction.deferReply();
        if (interaction.options.getSubcommand() === "search") {
            const key = interaction.options.getString('keyword');
			const res = await youtubeSearch(key);
			console.log("Hoi!")
			const embed = new EmbedBuilder()
				.setTitle("Search Results")
				.setColor(config.config.color.info);
			if(res.length === 0) {
				await interaction.editReply("Sorry, there's no result."); 
				return;
			}
			let i = 0;
			console.log(res);
			while(i < 5 && i < res.length) {
				embed.addFields(
					{ name: `${res[i].title + " | " + res[i].channel.name}`, value: res[i].link, inline: false },
				);
				i++;
				console.log("hoi!");
			}
			interaction.editReply({ embeds: [embed]});
        } else if (interaction.options.getSubcommand() === "info") {
            let url = interaction.options.getString("url");
            let videoChannel = "";
            let videoTitle = "";
            let videoLength = "";
            url = url.replace("https://www.youtube.com/watch?v=", "");
            url = url.replace("https://youtube.com/watch?v=", "");
            try {
                videoTitle = await ytdl.getInfo(url).then(info => {
                    let title = info.videoDetails.title;
                    return title;
                });
            } catch (err) {
                return;
            }
            try {
                videoChannel = await ytdl.getInfo(url).then(info => {
                    let artist = info.videoDetails.author.name;
                    return artist;
                });
            } catch (err) {
                return;
            }
            try {
                videoLength = await ytdl.getInfo(url).then(info => {
                    let len = info.videoDetails.lengthSeconds;
                    return len;
                });
            } catch (err) {
                return;
            }
            const embed = new EmbedBuilder()
                .setTitle('YouTube Info')
                .setColor(0x0099FF)
                .addFields(
                    { name: `Video Title`, value: videoTitle, inline: false },
                    { name: `Channel Name`, value: videoChannel, inline: true },
                    { name: `Length`, value: `${videoLength}s`, inline: true },
                    { name: `URL`, value: interaction.options.getString('url'), inline: true }
                )
                .setImage(getThumbnails(url));
            await interaction.editReply({ content: "Results", embeds: [embed] });
        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url");
            const playlist = await ytpl(await ytpl.getPlaylistID(url));
            let cont = "";
            for (i = 0; i < playlist.items.length; i++) {
                cont = cont + "\n" + playlist.items[i].title;
                console.log(playlist.items[i].title);
            }
            try {
                await interaction.editReply(cont);
            } catch (err) {
                await interactin.editReply("Cannot send playlist due to an error.");
            }
        }
    } if (interaction.commandName === "skip" || interaction.customId === "skip") {
        await interaction.deferReply();
        const guildId = interaction.guild.id.toString();
        if (!interaction.member.voice.channelId) { 
			await interaction.editReply("Please connect voice channel."); return;
		}
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { 
			await interaction.editReply("You are not in my voice channel."); return; 
		}
        const index = audio[guildId]["index"] + 1;
		if(index === audio[guildId]["queue"]) {
			await interaction.editReply("You cannot do that due to lack of music.");
		}

        if (index < audio[guildId]["queue"].length) {
			audio[guildId]["stream"].destroy();
            const url = audio[guildId]["queue"][index];
            try {
                audio[guildId]['stream'] = await dl(url);
            } catch (err) {
                await interaction.editReply(`The requested URL that ${url} was not found or invalid.`);
				return;
            }
            audio[guildId]['id'] = ytdl.getURLVideoID(url);
            audio[guildId]['volume'] = 1.0;
            audio[guildId]['index']++;

			await getVideoInfo(audio[guildId]["id"], audio[guildId]);

            audio[guildId]['resource'] = createAudioResource(audio[guildId]['stream'], {
                metadata: {
                    title: audio[guildId]['title'],
                    artist: audio[guildId]['artist'],
                    length: audio[guildId]['length'],
                    id: audio[guildId]['id'],
                    user: audio[guildId]["previousUser"],
                    autoreplay: audio[guildId]['autoReplay'],
                    channel: audio[guildId]["previousChannel"],
                },
                inlineVolume: true,
            });

            try {
                audio[guildId]["player"].play(audio[guildId]['resource']);
                audio[guildId]["stream"].pipe(fs.createWriteStream(`./music/${guildId}.webm`));
                interaction.editReply("Skip");
            } catch (err) {
                interaction.editReply("An error occurred. Please try again and check URL.");
                console.log(err.stack);
            }

        } else {
            await interaction.editReply("You cannot do that due to luck of music.");
			return;
        }
    } if (interaction.commandName === "back" || interaction.customId === "back") {
       	await interaction.deferReply();
        if (!interaction.member.voice.channelId) { 
			await interaction.editReply("Please connect voice channel."); return; 
		}
        const guildId = interaction.guild.id.toString();
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { 
			await interaction.editReply("You are not in my voice channel."); return; 	
		}
        const index = audio[guildId]["index"] - 1;
        if (index >= 0) {
			audio[guildId]["stream"].destroy();
            const url = audio[guildId]["queue"][index];
            try {
                audio[guildId]['stream'] = await dl(url);
            } catch (err) {
                interaction.editReply(`The requested URL that ${url} was not found or invalid.`);
            }
            audio[guildId]['id'] = ytdl.getURLVideoID(url);
            audio[guildId]['volume'] = 1.0;
            audio[guildId]['index']--;
			await getVideoInfo(audio[guildId]["id"], audio[guildId]);
            audio[guildId]['resource'] = createAudioResource(audio[guildId]['stream'], {
                metadata: {
                    title: audio[guildId]['title'],
                    artist: audio[guildId]['artist'],
                    length: audio[guildId]['length'],
                    id: audio[guildId]['id'],
                    user: audio[guildId]["previousUser"],
                    autoreplay: audio[guildId]['autoReplay'],
                    channel: audio[guildId]["previousChannel"],
                },
                inlineVolume: true,
            });

            try {
                audio[guildId]["player"].play(audio[guildId]['resource']);
                audio[guildId]["stream"].pipe(fs.createWriteStream(`./music/${guildId}.webm`));
                interaction.editReply("Back");
            } catch (err) {
                interaction.editReply("An error occurred. Please try again and check URL.");
                console.log(err.stack);
            }

        } else {
            await interaction.editReply("You cannot do that due to luck of music.");
        }
    } if (interaction.commandName === "replay" || interaction.customId === "replay") {
        await interaction.deferReply();
        if (!interaction.member.voice.channelId) { await interaction.editReply("Please connect voice channel."); return; }
        const guildId = interaction.guild.id.toString();
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { await interaction.editReply("You are not in my voice channel."); return; }
		audio[guildId]["resource"] = createAudioResource(`./music/${guildId}.webm`, {
            metadata: {
                title: audio[guildId]["title"],
                artist: audio[guildId]["artist"],
                length: audio[guildId]["length"],
                id: audio[guildId]["id"],
                user: interaction.user,
                channel: interaction.channel,
            }
        });
        try {
            await audio[guildId]["player"].play(audio[guildId]["resource"]);
            await interaction.editReply(`Replay Started by ${interaction.user}`);
        } catch (err) {
            await interaction.editReply("An error occurred. Please try again and check URL.");
        }
    } if (interaction.commandName === "tts") {
        await interaction.deferReply();
        const content = interaction.options.getString('content');
        try {
            await genAudio(content, "./audio/tts.wav");
        } catch (err) {
            await interaction.editReply("I'm sorry, but I cannot play the audio right now.");
            return;
        }
        ttsStream = "";
        if (!interaction.member.voice.channelId) { await interaction.editReply('Please connect voice channel.'); return; }
        if (interaction.member.voice.channelId === client.voice.channelId) {
            const resource = await createAudioResource('./audio/tts.wav', {
                inputType: StreamType.WebmOpus
            });
            await ttsPlayer.play(resource);
            await interaction.editReply({ content: `${content} has been played.` });
            return;
        }
        if (interaction.member.voice.channelId) {
            ttsConnection = await joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.channel.guild.id,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator,
                selfDeaf: false
            });
            await ttsConnection.subscribe(ttsPlayer);
        }
        const resource = await createAudioResource('./audio/tts.wav', {
            inputType: StreamType.WebmOpus
        });
        await ttsPlayer.play(resource);
        await interaction.editReply({ content: `${content} has been played.` });
    } if (interaction.commandName === "config") {
        await interaction.deferReply();
        if (interaction.options.getSubcommand() === "autoreplay") {
            let guildId = interaction.guild.id.toString();
            if (interaction.options.getBoolean('autoreplay') === true) {
                audio[guildId]['autoReplay'] = true;
            } else {
                audio[guildId]['autoReplay'] = false;
            }
            const embed = new EmbedBuilder()
                .setTitle(`Set your guild's auto-replay to ${interaction.options.getBoolean('autoreplay').toString().toUpperCase()}`);
            await interaction.editReply({ embeds: [embed] });
        }
    } if (interaction.customId === "volumeUp" || interaction.customId === "volumeDown") {
        await interaction.deferReply();
        if (!interaction.member.voice.channelId) { await interaction.editReply("Please connect voice channel."); return; }
        const guildId = interaction.guild.id.toString();
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { await interaction.editReply("You are not in my voice channel."); return; }
        let currentVolume = audio[guildId]["volume"];
        if (interaction.customId === "volumeUp") {
            if (currentVolume >= 3.0) { await interaction.editReply("You cannot set volume higher than 300%."); return; }
            else {
                audio[guildId]["resource"].volume.setVolume(Math.floor((currentVolume * 10) + 1) / 10);
                audio[guildId]["volume"] = Math.floor((currentVolume * 10) + 1) / 10;
                const embed = new EmbedBuilder()
                    .setTitle(`⇑ | Set volume to ${Math.floor((currentVolume * 10) + 1) * 10}%`);
                await interaction.editReply({ embeds: [embed] });
                return;
            }
        } else {
            if (currentVolume <= 0.1) { await interaction.editReply("You cannot set volume to 0."); return; }
            else {
                audio[guildId]["resource"].volume.setVolume(Math.floor((currentVolume * 10) - 1) / 10);
                audio[guildId]["volume"] = Math.floor((currentVolume * 10) - 1) / 10;
                const embed = new EmbedBuilder()
                    .setTitle(`⇓ | Set volume to ${Math.floor((currentVolume * 10) - 1) * 10}%`);
                await interaction.editReply({ embeds: [embed] });
                return;
            }
        }
    } if (interaction.commandName === "ncs") {
        await interaction.deferReply();
        if (interaction.options.getSubcommand() === "search") {
            let embed = "";
            const keyword = interaction.options.getString("keyword");
            const result = await ncs.search({ search: keyword });
            try { result[0].name; } catch (err) { await interaction.editReply("No results were found."); return; }
            try { result[1].name; } catch (err) {
                embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Search Results')
                    .addFields(
                        { name: `${result[0].name + " | " + result[0].artists[0].name}`, value: result[0].download.regular, inline: false },
                    );
                await interaction.editReply({ content: "Search Results", embeds: [embed] });
                return;
            }
            try { result[2].name; } catch (err) {
                embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Search Results')
                    .addFields(
                        { name: `${result[0].name + " | " + result[0].artists[0].name}`, value: result[0].download.regular, inline: false },
                        { name: `${result[1].name + " | " + result[1].artists[0].name}`, value: result[1].download.regular, inline: false },
                    );
                await interaction.editReply({ content: "Search Results", embeds: [embed] });
                return;
            }
            try { result[3].name; } catch (err) {
                embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Search Results')
                    .addFields(
                        { name: `${result[0].name + " | " + result[0].artists[0].name}`, value: result[0].download.regular, inline: false },
                        { name: `${result[1].name + " | " + result[1].artists[0].name}`, value: result[1].download.regular, inline: false },
                        { name: `${result[2].name + " | " + result[2].artists[0].name}`, value: result[2].download.regular, inline: false },
                    );
                await interaction.editReply({ content: "Search Results", embeds: [embed] });
                return;
            }
            try { result[4].name; } catch (err) {
                embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Search Results')
                    .addFields(
                        { name: `${result[0].name + " | " + result[0].artists[0].name}`, value: result[0].download.regular, inline: false },
                        { name: `${result[1].name + " | " + result[1].artists[0].name}`, value: result[1].download.regular, inline: false },
                        { name: `${result[2].name + " | " + result[2].artists[0].name}`, value: result[2].download.regular, inline: false },
                        { name: `${result[3].name + " | " + result[3].artists[0].name}`, value: result[3].download.regular, inline: false },
                    );
                await interaction.editReply({ content: "Search Results", embeds: [embed] });
                return;
            }
            embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Search Results')
                .addFields(
                    { name: `${result[0].name + " | " + result[0].artists[0].name}`, value: result[0].download.regular, inline: false },
                    { name: `${result[1].name + " | " + result[1].artists[0].name}`, value: result[1].download.regular, inline: false },
                    { name: `${result[2].name + " | " + result[2].artists[0].name}`, value: result[2].download.regular, inline: false },
                    { name: `${result[3].name + " | " + result[3].artists[0].name}`, value: result[3].download.regular, inline: false },
                    { name: `${result[4].name + " | " + result[4].artists[0].name}`, value: result[4].download.regular, inline: false },
                );
            await interaction.editReply({ content: "Search Results", embeds: [embed] });
        } else if (interaction.options.getSubcommand() === "info") {

        }
    } if (interaction.customId === "lyric") {
        await interaction.deferReply();
        const guildId = interaction.guild.id.toString();
        let artist = audio[guildId]["artist"];
        let song = audio[guildId]["title"];
        let lyrics = await lyricsFinder(artist, song) || "I'm sorry, but the song not found or lyric not found.";
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Lyrics")
            .setDescription(lyrics);
        await interaction.editReply({ content: "Lyrics", embeds: [embed] });
    } if (interaction.commandName === "suggest") {
        if (interaction.options.getSubcommand() === "yesorno") {
            await interaction.deferReply();
            const {
                body
            } = await request('https://yesno.wtf/api');
            const ans = await body.json();
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(ans.answer.toUpperCase())
                .setDescription(ans.answer.toUpperCase())
                .setImage(ans.image);
            await interaction.editReply({ content: "Result", embeds: [embed] });
        }
    } if (interaction.commandName === "playlist") {
		await interaction.deferReply();
		const guildId = interaction.guild.id.toString();
		if(interaction.options.getSubcommand() === "save") {
			if(music[0][guildId]["queue"].length === 0) {
				await interaction.editReply("Your guild has not any valid queue.");
				return;
			}
			music[0][guildId]["savedQueue"][music[0][guildId]["savedQueue"].length] = music[0][guildId]["queue"];
			await interaction.editReply({ content: `Added current queue to saved queue. Items:${music[0][guildId]["queue"].length} ID: ${music[0][guildId]["savedQueue"]}`});
		}
	} if (interaction.commandName === "play") {
       	await interaction.deferReply();
        const guildId = interaction.guild.id.toString();
        const url = interaction.options.getString("url");
        if(!interaction.member.voice.channelId) {
			const noValidVCEmbed = new EmbedBuilder()
			.setColor(config.config.color.info)
        	.setAuthor({ name: ` | 🚫 - Please join a voice channel first!`, iconURL: `${interaction.user.avatarURL({})}` })
			await interaction.editReply({ embeds: [noValidVCEmbed]});
			return;
		}
		if(audio[guildId] === undefined || null) {
			const temp = { 
				[guildId]: {
            	"previousUser": "",
            	"previousChannel": "",
            	"stream": "",
            	"connection": "",
            	"title": "",
            	"artist": "",
            	"length": "",
            	"id": "",
            	"autoReplay": "false",
            	"player": "",
            	"musicPath": "",
            	"channel": "",
            	"queue": [],
            	"resource": "",
            	"volume": "",
            	"index": 0,
            	"previousPanel": "",
				"savedQueue": [],
				"status": "",
        	}
			};
		audio = { ...audio, ...temp}
		}
		if (interaction.options.getBoolean('autoreplay') === true) {
            audio[guildId]['autoReplay'] = true;
        } else {
            audio[guildId]['autoReplay'] = false;
        }
        audio[guildId]["previousChannel"] = interaction.channel;
        audio[guildId]["previousUser"] = interaction.user;
        if(audio[guildId]["player"] === "") { 
			audio[guildId]["player"] = createAudioPlayer();
		}
		audio[guildId]["channel"] = interaction.member.voice.channelId;
        audio[guildId]['connection'] = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.channel.guild.id,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            selfDeaf: false
        });
        audio[guildId]["connection"].subscribe(audio[guildId]["player"]);
		audio[guildId]["connection"].on('stateChange', (old_state, new_state) => {
            if (old_state.status === VoiceConnectionStatus.Ready && new_state.status === VoiceConnectionStatus.Connecting) {
                audio[guildId]["connection"].configureNetworking();
            }
        });
		if(url === null && audio[guildId]["queue"].length !== 0) {
			const queueUrl = audio[guildId]["queue"][0];
			audio[guildId]["stream"] = await dl(queueUrl);
			audio[guildId]["id"] = ytdl.getURLVideoID(audio[guildId]["queue"][0]);
			audio[guildId]["volume"] = 1.0;
			audio[guildId]["index"] = 0;
			audio[guildId]["volume"] = 1.0;
			const resource = createAudioResource(audio[guildId]['stream'], {
				metadata: {
					title: audio[guildId]['title'],
					artist: audio[guildId]['artist'],
					length: audio[guildId]['length'],
					id: audio[guildId]['id'],
					user: interaction.user,
					autoreplay: audio[guildId]['autoReplay'],
					channel: interaction.channel,
				},
				inlineVolume: true,
			});
			audio[guildId]["resource"] = resource;
			try {
				audio[guildId]["player"].play(resource);
				audio[guildId]["stream"].pipe(fs.createWriteStream(`./music/${guildId}.webm`));
			} catch(err) {
				console.log(err.stack);
			}
			return;
		}
		
		if(url === null) {
			const joinedEmbed = new EmbedBuilder()
			.setColor(config.config.color.info)
        	.setAuthor({ name: ` | 👋 - I joined your voice channel.`, iconURL: `${interaction.user.avatarURL({})}` })
            await interaction.editReply({ embeds: [joinedEmbed]}); return; 
		}

        try {
            await ytpl.getPlaylistID(url);
            const playlist = await ytpl(ytpl.getPlaylistID(url));
            const playlitAddEmbed = new EmbedBuilder()
			.setColor(config.config.color.info)
        	.setAuthor({ name: ` | ✅ - Added ${playlist.items.length} items to the queue.`, iconURL: `${interaction.user.avatarURL({})}` })
            if (audio[guildId]["id"] === undefined || "") {
                for (i = 0; i < playlist.items.length; i++) {
                    audio[guildId]["queue"].push(playlist.items[i].url);
                }
                interaction.editReply({ embeds: [playlistAddEmbedd]});
            } else {
                for (i = 0; i < playlist.items.length; i++) {
                    audio[guildId]["queue"].push(playlist.items[i].url);
                }
                interaction.editReply({ embeds: [playlistAddEmbed]});
                return;
            }
        } catch (err) {
            if (ytdl.validateURL(url)) {
				if(!await isValidVideo(url)) {
					interaction.editReply("Please type accurate YouTube Video Link.");
					return;
				}
                if (audio[guildId]["id"] === null || audio[guildId]["id"] === undefined || audio[guildId]["id"] === "") {
					audio[guildId]["queue"].push(url);
                } else {
					audio[guildId]["queue"].push(url);
                    const addUrlEmbed = new EmbedBuilder()
					.setColor(config.config.color.info)
        			.setAuthor({ name: ` | ✅ - Added ${url} to the queue.`, iconURL: `${interaction.user.avatarURL({})}` })
                    await interaction.editReply({embeds: [addUrlEmbed]});
					return;
                }
            } else {
                const api = new YoutubeMusicApi();
                await api.initalize();
                    const stat = await api.search(url, "song")
                    .then(async (result) => {
                        if(result["content"].length === 0) { interaction.editReply("There's no music."); return "PLAYING";}
                        const resultEmbed = new EmbedBuilder()
							.setColor(config.config.color.info)
							.setAuthor({ name: ` | 🔍 Added ${result["content"][0]["name"]} to the queue.`, iconURL: `${interaction.user.avatarURL({})}` })
						interaction.editReply({ embeds: [resultEmbed]});
						if (audio[guildId]["id"] === undefined || audio[guildId]["id"] === "") {
                            audio[guildId]["queue"].push(`https://youtube.com/watch?v=${result["content"][0]["videoId"]}`);
                            return "NO";
                        } else {
                            audio[guildId]["queue"].push(`https://youtube.com/watch?v=${result["content"][0]["videoId"]}`);
                            return "PLAYING";
                        }
                    });
                    if(stat === "PLAYING") {
                        return;
                    }
            }
        }
		const queueUrl = audio[guildId]["queue"][0];
		audio[guildId]["stream"] = await dl(queueUrl);
		audio[guildId]["index"] = 0;
		audio[guildId]["volume"] = 1.0;
		audio[guildId]["id"] = ytdl.getURLVideoID(audio[guildId]["queue"][0]);
		await getVideoInfo(audio[guildId]["id"], audio[guildId]);
		const resource = createAudioResource(audio[guildId]['stream'], {
			metadata: {
				title: audio[guildId]['title'],
				artist: audio[guildId]['artist'],
				length: audio[guildId]['length'],
				id: audio[guildId]['id'],
				user: interaction.user,
				autoreplay: audio[guildId]['autoReplay'],
				channel: interaction.channel,
			},
			inlineVolume: true,
		});
		
		audio[guildId]["resource"] = resource;
		
		try {
			audio[guildId]["player"].play(resource);
			audio[guildId]["stream"].pipe(fs.createWriteStream(`./music/${guildId}.webm`));
		} catch(err) {
			console.log(err.stack);
		}
		
		audio[guildId]["player"].on('error', error => { console.error(error); });
		audio[guildId]["player"].on(AudioPlayerStatus.Playing, async (meta) => {
			audio[guildId]["status"] = "Playing";
    		const embed = new EmbedBuilder()
				.setColor(config.config.color.info)
        		.setTitle('Playing')
        		.setTimestamp()
        		.addFields(
            		{ name: 'Author', value: meta.resource.metadata.artist, inline: true },
            		{ name: 'Title', value: meta.resource.metadata.title, inline: true },
            		{ name: 'Length', value: `${meta.resource.playbackDuration / 1000}/${meta.resource.metadata.length}s`, inline: true },
            		{ name: 'Progress', value: `${generateProgress(meta.resource.playbackDuration / 1000, meta.resource.metadata.length, 30, "|", "=", "-")}`, inline: false},
            		{ name: 'Started by', value: `${meta.resource.metadata.user}`, inline: true },
            		{ name: 'Volume', value: `${Math.floor((audio[guildId]["volume"] * 10)) * 10}%`, inline: true },
            		{ name: 'Position', value: `${audio[guildId]["index"] + 1}/${audio[guildId]["queue"].length}`, inline: true },
            		{ name: 'Auto Replay', value: `${audio[guildId]["autoReplay"].toString().toUpperCase()}`, inline: false }
        		)
				//.setImage(getThumbnails(meta.resource.metadata.id));
			const btn = new ActionRowBuilder()
        		.addComponents(
            		new ButtonBuilder()
                		.setCustomId('pause')
                		.setLabel('Pause')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('replay')
                		.setLabel('Replay')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('stop')
                		.setLabel('Stop')
                		.setStyle(ButtonStyle.Danger),
            		new ButtonBuilder()
                		.setCustomId('back')
                		.setLabel('Back')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('skip')
                		.setLabel('Skip')
                		.setStyle(ButtonStyle.Primary));
    		const subBtn = new ActionRowBuilder()
        		.addComponents(
            		new ButtonBuilder()
                		.setCustomId('volumeDown')
                		.setLabel('Down')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('volumeUp')
                		.setLabel('Up')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('lyric')
                		.setLabel('Lyric')
                		.setStyle(ButtonStyle.Secondary),
            		new ButtonBuilder()
                		.setCustomId('queue')
                		.setLabel('Queue')
                		.setStyle(ButtonStyle.Success));
    		const msg = await audio[guildId]["previousChannel"].send({ embeds: [embed], components: [btn, subBtn] });
			audio[guildId]["previousChannel"].setTopic(`♬ - Playing ${meta.resource.metadata.title} by ${meta.resource.metadata.artist} Length: ${meta.resource.playbackDuration / 1000}/${audio[guildId]["length"]}`);
			if (!audio[guildId]["previousPanel"]) {
        		audio[guildId]["previousPanel"] = msg;
        		return;
    		} else {
        		audio[guildId]["previousPanel"].delete();
        		audio[guildId]["previousPanel"] = msg;
        		return;
    		}
		});
		
		audio[guildId]["player"].on(AudioPlayerStatus.Paused, async (meta) => {
			audio[guildId]["status"] = "Pausing";
    		const embed = new EmbedBuilder()
        		.setColor(config.config.color.info)
        		.setTitle('Pausing')
        		.setTimestamp()
        		.addFields(
            		{ name: 'Author', value: meta.resource.metadata.artist, inline: true },
            		{ name: 'Title', value: meta.resource.metadata.title, inline: true },
            		{ name: 'Length', value: `${(meta.resource.playbackDuration / 1000)}/${meta.resource.metadata.length}s`, inline: true },
            		{ name: 'Progress', value: `${generateProgress((meta.resource.playbackDuration / 1000), meta.resource.metadata.length, 30, "|", "=", "-")}`, inline: false},
            		{ name: 'Started by', value: `${meta.resource.metadata.user}`, inline: true },
            		{ name: 'Volume', value: `${Math.floor((audio[guildId]["volume"] * 10)) * 10}%`, inline: true },
            		{ name: 'Position', value: `${audio[guildId]["index"] + 1}/${audio[guildId]["queue"].length}`, inline: true },
            		{ name: 'Auto Replay', value: `${audio[guildId]["autoReplay"].toString().toUpperCase()}`, inline: false }
        		)
				//.setImage(getThumbnails(meta.resource.metadata.id));
			const btn = new ActionRowBuilder()
        		.addComponents(
            		new ButtonBuilder()
                		.setCustomId('unpause')
                		.setLabel('Resume')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('replay')
                		.setLabel('Replay')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('stop')
                		.setLabel('Stop')
                		.setStyle(ButtonStyle.Danger),
            		new ButtonBuilder()
                		.setCustomId('back')
                		.setLabel('Back')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('skip')
                		.setLabel('Skip')
                		.setStyle(ButtonStyle.Primary));
    		const subBtn = new ActionRowBuilder()
        		.addComponents(
            		new ButtonBuilder()
                		.setCustomId('volumeDown')
                		.setLabel('Down')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('volumeUp')
                		.setLabel('Up')
                		.setStyle(ButtonStyle.Primary),
            		new ButtonBuilder()
                		.setCustomId('lyric')
                		.setLabel('Lyric')
                		.setStyle(ButtonStyle.Secondary),
            		new ButtonBuilder()
                		.setCustomId('queue')
                		.setLabel('Queue')
                		.setStyle(ButtonStyle.Success));
    		const msg = await audio[guildId]["previousChannel"].send({ embeds: [embed], components: [btn, subBtn] });
			audio[guildId]["previousChannel"].setTopic(`♬ - Playing ${meta.resource.metadata.title} by ${meta.resource.metadata.artist} Length: ${meta.resource.playbackDuration / 1000}/${audio[guildId]["length"]}`);
    		if (!audio[guildId]["previousPanel"]) {
        		audio[guildId]["previousPanel"] = msg;
        		return;
    		} else {
        		audio[guildId]["previousPanel"].delete();
        		audio[guildId]["previousPanel"] = msg;
        		return;
    		}	
		});
		
		audio[guildId]["player"].on('stateChange', async (oldState, newState) => {
			if (oldState.status === "playing" && newState.status === "idle") {
				if(audio[guildId]["index"] + 1 === audio[guildId]["queue"].length) {
					if(audio[guildId]["autoReplay"] === true) {
						audio[guildId]["index"] = 0;
						const queueUrl = audio[guildId]["queue"][0];
						try {
                    		audio[guildId]['stream'] = await dl(queueUrl);
                		} catch (err) {
                    		console.log(err.stack);
                    		return;
                		}
						audio[guildId]["id"] = ytdl.getURLVideoID(queueUrl);
						await getVideoInfo(audio[guildId]["id"], audio[guildId]);
                		audio[guildId]['resource']= createAudioResource(audio[guildId]['stream'], {
                    		metadata: {
                        		title: audio[guildId]['title'],
                        		artist: audio[guildId]['artist'],
                        		length: audio[guildId]['length'],
                        		id: audio[guildId]['id'],
                        		user: audio[guildId]["previousUser"],
                        		autoreplay: audio[guildId]['autoReplay'],
                        		channel: audio[guildId]["previousChannel"],
                    		},
                    		inlineVolume: true,
                		});
						try {
                    		audio[guildId]["player"].play(audio[guildId]["resource"]);
                    		audio[guildId]["stream"].pipe(fs.createWriteStream(`./music/${guildId}.webm`));
                		} catch (err) {
                    		audio[guildId]["previousChannel"].send("An error occured. Please try again or check URL.");
                    		audio[guildId]["id"] = "";
                    		console.log(err.stack);
                    		return;
                		}
						return;
					} else {
						await audio[guildId]["previousChannel"].send("Finished Playing Queue.");
						audio[guildId]["status"] = "Stopping";
						audio[guildId]["stream"].destroy();
						audio[guildId]["resource"] = "";
						audio[guildId]["title"] = "";
						audio[guildId]["id"] = "";
						audio[guildId]["artist"] = "";
						audio[guildId]["length"] = "";
						return;
					}
				}
				
				if((audio[guildId]["index"] + 1) < audio[guildId]["queue"].length) {
					const queueUrl = audio[guildId]["queue"][audio[guildId]["index"] + 1];
					console.log(queueUrl);
					audio[guildId]["index"]++;
					
					try {
						audio[guildId]['stream'] = await dl(queueUrl);
					} catch (err) {
						console.log(err.stack);
						return;
					}
					
					audio[guildId]["id"] = ytdl.getURLVideoID(queueUrl);
					await getVideoInfo(audio[guildId]["id"], audio[guildId]);
					audio[guildId]['resource']= createAudioResource(audio[guildId]['stream'], {
						metadata: {
							title: audio[guildId]['title'],
							artist: audio[guildId]['artist'],
							length: audio[guildId]['length'],
							id: audio[guildId]['id'],
							user: audio[guildId]["previousUser"],
							autoreplay: audio[guildId]['autoReplay'],
							channel: audio[guildId]["previousChannel"],
						},
						inlineVolume: true,
					});
					try {
						audio[guildId]["player"].play(audio[guildId]["resource"]);
						audio[guildId]["stream"].pipe(fs.createWriteStream(`./music/${guildId}.webm`));
					} catch (err) {
						audio[guildId]["previousChannel"].send("An error occured. Please try again or check URL.");
						audio[guildId]["id"] = "";
						console.log(err.stack);
						return;
					}
				}
			} else {
				return;
			}
		});
	} if(interaction.commandName === "seek") {
        await interaction.deferReply();
		const guildId = interaction.guild.id.toString();
		if (!interaction.member.voice.channelId) { await interaction.editReply("Please connect voice channel."); return; }
        if (interaction.member.voice.channelId !== audio[guildId]["channel"]) { await interaction.editReply("You are not in my voice channel."); return; }
		if(!audio[guildId]["id"]) {
			await interaction.editReply("You are not playing any audio.");
			return;
		}
		audio[guildId]["resource"].playback = 20 * 1000;
		console.log(audio[guildId]["resource"].playStream.playbackDuration);
		await interaction.editReply("Seeked");
    } if(interaction.commandName === "help") {
		await interaction.deferReply();
		const embed = new EmbedBuilder()
		.setColor(config.config.color.info)
		.setTitle('Help Menu')
		.setTimestamp()
		.addFields(
			{ name: 'Status', value: "/ping /status", inline: true },
			{ name: 'Music', value: "/play /pause /unpause /stop", inline: true },
			{ name: 'Queue', value: `/queue display /queue add /queue remove /queue delete`, inline: true},
			{ name: 'Web', value: `/screenshot /whois`, inline: true },
			{ name: 'Image', value: `/image ocr`, inline: true },
			{ name: 'Radio', value: `/radio play /radio stop`, inline: true },
			{ name: 'Search', value: `/youtube search /ncs search`, inline: true }
		);
		await interaction.editReply({ embeds: [embed]});
	} if(interaction.commandName === "radio" && !interaction.isAutocomplete()) {
		const guildId = interaction.guild.id.toString();
		await interaction.deferReply();
		if(radio[guildId] === undefined || null) {
			const temp = { 
				[guildId]: {
            	"previousUser": "",
            	"previousChannel": "",
            	"stream": "",
            	"connection": "",
            	"title": "",
            	"player": "",
            	"channel": "",
            	"previousPanel": "",
        	}
			};
		radio = { ...radio, ...temp}
		}
		if(interaction.options.getSubcommand() === "play") {
			if(radio[guildId]["player"] === "") { 
				radio[guildId]["player"] = createAudioPlayer();
				radio[guildId]["player"].setMaxListeners(100);
			}
			const connection = joinVoiceChannel({
            	channelId: interaction.member.voice.channelId,
            	guildId: interaction.channel.guild.id,
            	adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            	selfDeaf: false
        	});
			radio[guildId]["connection"] = connection;
			await connection.subscribe(radio[guildId]["player"]);
			radio[guildId]["connection"].on('stateChange', (old_state, new_state) => {
            	if (old_state.status === VoiceConnectionStatus.Ready && new_state.status === VoiceConnectionStatus.Connecting) {
					radio[guildId]["connection"].configureNetworking();
				}
        	});
			const resource = createAudioResource((radioUrl[radioList.indexOf(interaction.options.getString("query"))]), {
				inlineVolume: true,
			});
			radio[guildId]["resource"] = resource;
			radio[guildId]["player"].play(resource);
			await interaction.editReply("Started Playing Radio");
		}
		if(interaction.options.getSubcommand() === "stop") {
			if(radio[guildId]["player"] === "") {
				await interaction.editReply("Sorry, you are not playing any radio right now :(");
				return;
			}
			await radio[guildId]["connection"].disconnect(radio[guildId]["player"]);
			radio[guildId]["player"].stop();
			
			await interaction.editReply("I finished playing radio.");
		}
	} if(interaction.commandName === "status") {
		await interaction.deferReply();
		const os = require("os");
		var totalCores = "";
		var avgClockMHz = "";
		var percents = "";
		var osInfo = "";
		avgClockMHz = await cpuStat.avgClockMHz();
		osInfo = os.cpus();
		await cpuStat.usagePercent(function(err, percent, seconds) {
    		if (err) {
      			return console.log(err);
			}
			totalCores = cpuStat.totalCores();
			console.log(percent);
			const embed = new EmbedBuilder()
				.setColor(config.config.color.info)
				.setTitle('Status')
				.setTimestamp()
				.addFields(
					{ name: 'CPU', value: `${osInfo[0].model}`, inline: true },
					{ name: 'Usage', value: `${percent * 100}%`, inline: true },
					{ name: 'Clock', value: `${avgClockMHz}MHz`, inline: true },
					{ name: 'CPU Count', value: `${totalCores}` , inline: false },
			);
			interaction.editReply({ embeds: [embed]});
		});
	} if(interaction.commandName === "image") {
		if(interaction.options.getSubcommand() === "ocr") {
			await interaction.deferReply();
			const image = interaction.options._hoistedOptions[0].attachment.url;
			if(image.endsWith("png") === false) {
				await interaction.editReply("Sorry, currently I cannot process your file .");
				return;
			}
			tesseract
  				.recognize(image, ocrConfig)
				.then((text) => {
					interaction.editReply(`OCR Results: ${text}`);
					return;
				})
			.catch((error) => {
				interaction.editReply("Sorry, I couldn't process your file.");
			});
		}
	} if(interaction.commandName === "learn") {
		if(interaction.options.getSubcommand() === "speak") {
			await interaction.deferReply();
			const text = interaction.options.getString("text");
			if(!interaction.member.voice) { await interaction.editReply("Please connect a voice channel!"); return; }
			const connection = joinVoiceChannel({
            	channelId: interaction.member.voice.channelId,
            	guildId: interaction.channel.guild.id,
            	adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            	selfDeaf: false
        	});
			const player = createAudioPlayer();
        	await connection.subscribe(player);
			connection.on('stateChange', (old_state, new_state) => {
				if (old_state.status === VoiceConnectionStatus.Ready && new_state.status === VoiceConnectionStatus.Connecting) {
					connection.configureNetworking();
				}
			});
			await gtts.save("./audio/tts.wav", text, async function() {
  				const resource = createAudioResource("./audio/tts.wav");
				await wait(1000);
				await player.play(resource);
				await interaction.editReply(`Played ${text} to your voice channel.`);
			});
		}
		if(interaction.options.getSubcommand() === "start") {
			await interaction.deferReply();
			if(ttsList.indexOf(interaction.channel.id) === -1) {
				ttsList.push(interaction.channel.id);
				await interaction.editReply("Set TTS");
				return;
			} else {
				await interaction.editReply("Your channel already set up as a TTS channel.");
			}
		}
		if(interaction.options.getSubcommand() === "stop") {
			await interaction.deferReply();
			if(ttsList.indexOf(interaction.channel.id) === -1) {
				await interaction.editReply("You didn't set up this channel as a TTS channel.");
				return;
			} else {
				let num = ttsList.indexOf(interaction.channel.id);
				ttsList.splice(num, 1);
				await interaction.editReply("Disabled TTS");
				return;
			}
		}
	} if(interaction.commandName === "freetalk") {
		if(interaction.options.getSubcommand() === "enable") {
			freetalkList.push(interaction.channel.id.toString());
			await interaction.reply("Set up AI Bot");
		} else {
			freetalkList.splice(freetalkList.indexOf(interaction.channel.id.toString()), 1);
			await interaction.reply("Finished AI Bot");
		}
	}
});

// ! These process are system process!!!
process.on('uncaughtException', async (err) => {
    console.log(`\x1b[41mError! Error Status is \x1b[49m:${err.stack}`);
});
if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}
app.use(session(sess));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/login', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200);
    res.send(fs.readFileSync('./web/login.html'));
    console.log('New Login');
});
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === 'password') {
        req.session.regenerate((err) => {
            req.session.username = 'admin';
            res.redirect('/');
        });
    } else {
        res.redirect('/login');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});
app.get('/icon', (req, res) => {
    res.send(fs.readFileSync("./icon.webp"));
});
app.use((req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/login');
    }
});
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200);
    res.send(fs.readFileSync('./web/index.html'));
    console.log('New Access');
});
server.listen(config.config.port, () => {
    console.log(`Listening on ${config.config.port}`);
});
io.on('connection', (socket) => {
	socket.on('disconnect', () => {
        console.log('User disconnected');
    });
	socket.on('msg', (content, id) => {
        id = id.toString();
        client.channels.cache.get(id).send(content);
        io.emit("sended");
    });
	socket.on('dm', async (msg, user) => {
        try {
            usr = await client.users.cache.get(user);
            usr.send(msg);
            await io.emit("dmsended");
        } catch (err) {
            await io.emit("warn", "Cannot send message to the User.")
        }
    });
	socket.on("server", async() => {
		io.emit("server", guildList, guildNameList);
	});
	socket.on("music", async(type, id) => {
		if(audio[id] === undefined) return;
		if(type === "pause") {
			audio[id]["player"].pause();
		}
		if(type === "unpause") {
			audio[id]["player"].unpause();
		}
	});
    socket.on('refresh', async (id) => {
        if(audio[id] === undefined) {
			return;
		}
		io.emit("refresher" , audio[id]["title"], audio[id]["artist"], audio[id]["length"], audio[id]["volume"], audio[id]["resource"].playbackDuration, audio[id]["id"], audio[id]["queue"]);
    });
	socket.on('voice', async (result, id) => {
		console.log(result, id);
		if(result.match("Play")) {
			const query = result.replace("Play", "");
			const api = new YoutubeMusicApi();
				await api.initalize();
				const stat = await api.search(url, "song")
					.then(async (result) => {
                        if(result["content"].length === 0) return;
						if (audio[guildId]["id"] === undefined || audio[guildId]["id"] === "") {
                            audio[guildId]["queue"].push(`https://youtube.com/watch?v=${result["content"][0]["videoId"]}`);
                            return "NO";
                        } else {
                            audio[guildId]["queue"].push(`https://youtube.com/watch?v=${result["content"][0]["videoId"]}`);
                            return "PLAYING";
                        }
                    });
		}
		if(result.match("Pause")) {
			audio[id.toString()]["player"].pause();
		}
		if(result.match("Resume")) {
			audio[id.toString()]["player"].unpause();
		}
    	});
});

try {
    client.login(config.token.bot);
} catch (err) {
    console.log('Could not login as user');
    process.exit();
}
function getThumbnails(id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function orgFloor(value, base) {
    return Math.floor(value * base) / base;
}
const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;
    do {
        context.font = `${fontSize -= 10}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);
    return context.font;
};
function generateProgress(currentPosition, endPosition, size, c0, c1, c2) {
    const per = currentPosition / endPosition;
    const pos = Math.round((size - 1) * per);
    return `[${c1.repeat(pos)}${c0}${c2.repeat(size - pos - 1)}]`;
}
async function getVideoInfo(id, dic) {
	try {
		dic['title'] = await ytdl.getInfo(id).then(info => {
        	return info.videoDetails.title;
		});
		dic['artist'] = await ytdl.getInfo(id).then(info => {
			return info.videoDetails.author.name;
		});
		dic['length'] = await ytdl.getInfo(id).then(info => {
			return info.videoDetails.lengthSeconds;
		});
		return true;
	} catch(err) {
		return false;
	}
}
async function isValidVideo(id) {
	try {
		const test = await ytdl.getInfo(id).then(info => {
        	return info.videoDetails.title;
		});
		return true;
	} catch(err) {
		return false;
	}
}
async function spotifyToYt(url) {
	if(url.match("open.spotify.com")) {
		const  fetch  =  require ( 'isomorphic-unfetch' ) ;
		const  { getData , getPreview , getTracks , getDetails }  =  require ( 'spotify-url-info' ) ( fetch );
		let title = "";
		let artist = "";
		await getDetails(url, {
			headers: {
				'user-agent': 'googlebot'
			}
		}).then(async (data) => {
			title = data.tracks[0].name;
			artist = data.tracks[0].artist;
			return;
		});
		const res = await youtube.search(`${title} ${artist}`).then(results => {
			return results.videos[0].link;
		});
		return res;
	} else {
		return undefined;
	}
}
function dl(url) {
	const stream = ytdl(ytdl.getURLVideoID(url), {
		filter: format => format.audioCodec === 'opus' && format.container === 'webm',
		quality: 'highest',
		highWaterMark: 64 * 1024 * 1024,
	});
	return stream;
}
function guildAudioListInit(id) {
	audio[id] = {
		"previousUser": "",
		"previousChannel": "",
		"stream": "",
		"connection": "",
		"title": "",
		"artist": "",
		"length": "",
		"id": "",
		"autoReplay": "false",
		"player": "",
		"musicPath": "",
		"channel": "",
		"queue": [],
		"resource": "",
		"volume": "",
		"index": 0,
		"previousPanel": "",
		"savedQueue": [],
		"status": "",
	}
}
