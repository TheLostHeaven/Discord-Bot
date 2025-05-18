import { joinVoiceChannel, VoiceConnection } from '@discordjs/voice';
import { GuildMember } from 'discord.js';

export async function joinVoice(member: GuildMember): Promise<VoiceConnection> {
    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
        throw new Error('🎧 Debes estar en un canal de voz.');
    }

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    return connection;
}
