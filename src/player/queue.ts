import { AudioPlayer, VoiceConnection } from '@discordjs/voice';
import { Guild } from 'discord.js';

export interface Track {
	title: string;
	url: string;
}

interface GuildAudioData {
	connection: VoiceConnection;
	player: AudioPlayer;
	queue: Track[];
	playing: boolean;
}

const queues = new Map<string, GuildAudioData>();

export function getQueue(guildId: string): GuildAudioData | undefined {
	return queues.get(guildId);
}

export function createQueue(guildId: string, data: GuildAudioData) {
	queues.set(guildId, data);
}

export function deleteQueue(guildId: string) {
	queues.delete(guildId);
}

export function hasQueue(guild: Guild) {
	return queues.has(guild.id);
}
