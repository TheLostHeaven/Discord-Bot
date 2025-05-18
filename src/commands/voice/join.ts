import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { joinVoice } from '@/player/joinVoice';

export default {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Hace que el bot se una a tu canal de voz'),

	async execute(interaction: ChatInputCommandInteraction) {
		const member = interaction.member as GuildMember;

		try {
			const connection = await joinVoice(member);
			await interaction.reply(`✅ Me he unido al canal: <#${connection.joinConfig.channelId}>`);
		} catch (error: any) {
			await interaction.reply({ content: error.message, ephemeral: true });
		}
	},
};
