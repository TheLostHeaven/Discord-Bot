import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { playMusic } from '@/player/audioManager';

export default {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Reproduce una canción')
		.addStringOption(opt =>
			opt.setName('query').setDescription('Nombre o URL de la canción').setRequired(true),
		),

	async execute(interaction: ChatInputCommandInteraction) {
		const query = interaction.options.getString('query', true);
		await playMusic(interaction, query);
	},
};
