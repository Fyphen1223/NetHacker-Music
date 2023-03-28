var start = new Date();
const { REST, SlashCommandBuilder, Routes, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const config = require("./config.json");
const commands = [
		new SlashCommandBuilder().setName('ping').setDescription('Replies with ping'),
		new SlashCommandBuilder().setName('user').setDescription('Replies with send user info'),
		new SlashCommandBuilder()
			.setName('clear')
			.setDescription('Clear message')
			.setDMPermission(false)
			.setDefaultMemberPermissions(0)
			.addIntegerOption(option => 
				option.setName('clear')
				.setDescription('Number of you want to clear')
				.setRequired(true)),
		new SlashCommandBuilder()
			.setName('whois')
			.setDescription('Check whois information')
			.addStringOption(option =>
				option.setName('domain')
				.setDescription('Domain name')
				.setRequired(true)),
		new SlashCommandBuilder()
			.setName('screenshot')
			.setDescription('Get web page screenshot')
			.addStringOption(option =>
				option.setName('url')
				.setDescription('URL')
				.setRequired(true)),
		new SlashCommandBuilder()
			.setName('stop')
			.setDescription('Stop playing music')
			.setDMPermission(false),
		new SlashCommandBuilder()
			.setName('lyric')
			.setDescription('Get song lyric')
			.addStringOption(option =>
				option.setName('artist')
				.setDescription('Artist')
				.setRequired(true))
			.addStringOption(option =>
				option.setName('song')
				.setDescription('Song name')
				.setRequired(true)),
		new SlashCommandBuilder()
			.setName('play')
			.setDescription('Play music')
			.setDMPermission(false)
			.addStringOption(option =>
				option.setName('url')
				.setDescription('URL'))
			.addBooleanOption(option =>
				option.setName('autoreplay')
					.setDescription('Auto Replay')),
		new SlashCommandBuilder()
			.setName('pause')
			.setDescription('Pause playing music')
			.setDMPermission(false),
		new SlashCommandBuilder()
			.setName('unpause')
			.setDescription('Unpause playing music')
			.setDMPermission(false),
		new SlashCommandBuilder()
			.setName('queue')
			.setDescription('Configure queue playlist')
			.setDMPermission(false)
			.addSubcommand(subcommand =>
				subcommand.setName('display')
				.setDescription("Display your guild's queue"))
			.addSubcommand(subcommand => 
				subcommand.setName('add')
				.setDescription('Add music to the queue')
				.addStringOption(option =>
					option.setName('url')
					.setDescription('URL')
					.setRequired(true)))
			.addSubcommand(subcommand => 
				subcommand.setName('addrelate')
				.setDescription('Add related audio to the queue'))
			.addSubcommand(subcommand =>
				subcommand.setName('delete')
				.setDescription('Delete music from the queue')
				.addStringOption(option =>
					option.setName('url')
					.setDescription('URL')
					.setRequired(true)
					.setAutocomplete(true)))
			.addSubcommand(subcommand =>
				subcommand.setName('remove')
				.setDescription('Remove all music from the playlist'))
			.addSubcommand(subcommand => 
				subcommand.setName("save")
				.setDescription("Save current queue"))
			.addSubcommand(subcommand =>
				subcommand.setName("load")
				.setDescription("Load queue ID")
				.addIntegerOption(option =>
					option.setName('id')
					.setDescription('Queue ID')
					.setRequired(true))),
		new SlashCommandBuilder()
			.setName('playlist')
			.setDescription('Public queue')
			.addSubcommand(subcommand => 
				subcommand.setName("save")
				.setDescription("Save current queue"))
			.addSubcommand(subcommand =>
				subcommand.setName("load")
				.setDescription("Load queue from ID")
				.addIntegerOption(option =>
					option.setName('id')
					.setDescription('Queue ID')
					.setRequired(true)))
			.addSubcommand(subcommand => 
				subcommand.setName('remove')
				.setDescription('Remove online queue that you created')
				.addIntegerOption(option =>
					option.setName('id')
					.setDescription('Queue ID')
					.setRequired(true))),
		new SlashCommandBuilder()
			.setName('youtube')
			.setDescription('YouTube')
			.addSubcommand(subcommand =>
				subcommand.setName('search')
				.setDescription('Search on YouTube')
				.addStringOption(option =>
					option.setName('keyword')
					.setDescription('Keyword')
					.setRequired(true)))
			.addSubcommand(subcommand =>
				subcommand.setName('info')
				.setDescription('YouTube Video Information')
				.addStringOption(option =>
					option.setName('url')
					.setDescription('Video URL')
					.setRequired(true)))
			.addSubcommand(subcommand =>
				subcommand.setName('playlist')
				.setDescription('YouTube Playlist Information')
				.addStringOption(option =>
					option.setName('url')
					.setDescription('Playlist URL')
					.setRequired(true))),
		new SlashCommandBuilder()
			.setName('skip')
			.setDescription('Skip playing music'),
		new SlashCommandBuilder()
			.setName('back')
			.setDescription('Back playing music'),
		new SlashCommandBuilder()
			.setName('replay')
			.setDescription('Replay music'),
		new SlashCommandBuilder()
			.setName('tts')
			.setDescription('TTS')
			.addStringOption(option=>
				option.setName('content')
				.setDescription('TTS Content')
				.setRequired(true)),
		new SlashCommandBuilder()
			.setName('config')
			.setDescription('General Config')
			.addSubcommand(subcommand =>
				subcommand.setName('autoreplay')
				.setDescription(`Enable or disable your guild's auto-replay`)
				.addBooleanOption(option =>
					option.setName('autoreplay')
					.setDescription(`Enable or disable your guild's auto-replay`)
					.setRequired(true))),
		new SlashCommandBuilder()
			.setName('ncs')
			.setDescription('NCS')
			.addSubcommand(subcommand =>
				subcommand.setName('search')
				.setDescription('Search on NCS')
				.addStringOption(option =>
					option.setName('keyword')
					.setDescription('Keyword')
					.setRequired(true)))
			.addSubcommand(subcommand =>
				subcommand.setName('info')
				.setDescription('NCS Music Information')
				.addStringOption(option =>
					option.setName('url')
					.setDescription('Music URL')
					.setRequired(true))),
		new SlashCommandBuilder()
			.setName('suggest')
			.setDescription('Suggest something')
			.addSubcommand(subcommand =>
				subcommand.setName('yesorno')
				.setDescription("Return yes or no")),
		new SlashCommandBuilder()
			.setName('soundcloud')
			.setDescription('SoundCloud')
			.addSubcommand(subcommand =>
				subcommand.setName('search')
				.setDescription('Search on SoundCloud')
				.addStringOption(option =>
					option.setName('keyword')
					.setDescription('Keyword')
					.setRequired(true)))
			.addSubcommand(subcommand =>
				subcommand.setName('info')
				.setDescription('SoundCloud Video Information')
				.addStringOption(option =>
					option.setName('url')
					.setDescription('Music URL')
					.setRequired(true)))
			.addSubcommand(subcommand =>
				subcommand.setName('playlist')
				.setDescription('SoundCloud Playlist Information')
				.addStringOption(option =>
					option.setName('url')
					.setDescription('Playlist URL')
					.setRequired(true))),
		new SlashCommandBuilder()
			.setName('help')
			.setDescription("Help"),
		new SlashCommandBuilder()
			.setName('status')
			.setDescription("Show Bot Status"),
		new SlashCommandBuilder()
			.setName('search')
			.setDescription('Search')
			.addStringOption(option =>
				option.setName('query')
				.setDescription('Phrase to search for')
				.setAutocomplete(true)),
		new SlashCommandBuilder()
			.setName('radio')
			.setDescription('Play Radio')
			.addSubcommand(subcommand =>
				subcommand.setName('play')
				.setDescription('Play Radio')
				.addStringOption(option =>
					option.setName('query')
					.setDescription('Radio Query')
					.setRequired(true)
					.setAutocomplete(true)))
			.addSubcommand(subcommand =>
				subcommand.setName('stop')
				.setDescription('Stop Radio')),
		new SlashCommandBuilder()
			.setName('image')
			.setDescription("Image")
			.addSubcommand(subcommand =>
				subcommand.setName('ocr')
				.setDescription("OCR Image")
				.addAttachmentOption(option =>
					option.setName("file")
					.setDescription("File to OCR")
					.setRequired(true))),
		new SlashCommandBuilder()
			.setName('learn')
			.setDescription('Learning')
			.addSubcommand(subcommand =>
				subcommand.setName("speak")
				.setDescription("Speak it")
				.addStringOption(option =>
					option.setName("text")
					.setDescription("Text to speech")
					.setRequired(true)))
			.addSubcommand(subcommand =>
				subcommand.setName("start")
				.setDescription("Start English TTS"))
			.addSubcommand(subcommand =>
				subcommand.setName("stop")
				.setDescription("Stop English TTS")),
		new SlashCommandBuilder()
			.setName('freetalk')
			.setDescription('Freetalk with AI')
			.addSubcommand(subcommand =>
				subcommand.setName("enable")
				.setDescription("Enable Chat AI"))
			.addSubcommand(subcommand =>
				subcommand.setName("disable")
				.setDescription("Disable Chat AI")),
		new SlashCommandBuilder()
			.setName('seek')
			.setDescription("Seek audio")
			.addStringOption(option =>
				option.setName("time")
				.setDescription("Time: ex. 00:00:02")
				.setRequired(true))
].map(command => command.toJSON());
const rest = new REST({ version: '10' }).setToken(config.token.bot);
const reset = [];
rest.put(Routes.applicationCommands(config.bot.applicationId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands with ${(new Date() - start)/1000}s`))
	.catch(console.error);