import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import { ChatInputCommandInteraction } from 'discord.js';
import play from 'play-dl';
import { createQueue, getQueue } from './queue';
import { joinVoice } from './joinVoice';

export async function playMusic(interaction: ChatInputCommandInteraction, query: string) {
	const member = interaction.member;
	if (!member || !('voice' in member)) return interaction.reply('🎧 Debes estar en un canal de voz.');
	const voiceChannel = member.voice.channel;
	if (!voiceChannel) return interaction.reply('🎧 Debes estar en un canal de voz.');

	const url = play.yt_validate(query) ? query : (await play.search(query, { limit: 1 }))[0]?.url;
	if (!url) return interaction.reply('❌ No encontré resultados.');

	const stream = await play.stream(url);
	const resource = createAudioResource(stream.stream, { inputType: stream.type });

	
	const connection = joinVoiceChannel({
		channelId: voiceChannel.id,
		guildId: interaction.guild!.id,
		adapterCreator: interaction.guild!.voiceAdapterCreator,
	});
	await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

	let player = getQueue(interaction.guild!.id)?.player;
	if (!player) {
		player = createAudioPlayer();
		connection.subscribe(player);

		createQueue(interaction.guild!.id, {
			connection,
			player,
			queue: [],
			playing: true,
		});

		player.on(AudioPlayerStatus.Idle, () => {
			const data = getQueue(interaction.guild!.id);
			if (!data) return;

			const next = data.queue.shift();
			if (next) {
				play.stream(next.url).then(nextStream => {
					const nextResource = createAudioResource(nextStream.stream, { inputType: nextStream.type });
					player!.play(nextResource);
				});
			} else {
				data.connection.destroy();
			}
		});
	}

	player.play(resource);
	await interaction.reply(`🎶 Reproduciendo: ${url}`);
}
