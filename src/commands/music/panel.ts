import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('panel')
		.setDescription('Muestra controles de reproducción (pausa, skip, etc.)'),

	async execute(interaction: ChatInputCommandInteraction) {
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId('pause')
				.setLabel('⏸️ Pausar')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('resume')
				.setLabel('▶️ Reanudar')
				.setStyle(ButtonStyle.Success),
			new ButtonBuilder()
				.setCustomId('skip')
				.setLabel('⏭️ Saltar')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('stop')
				.setLabel('⏹️ Detener')
				.setStyle(ButtonStyle.Danger),
		);

		await interaction.reply({
			content: '🎵 Controles de música',
			components: [row],
		});
	},
};
