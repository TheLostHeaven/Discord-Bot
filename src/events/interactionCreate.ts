import { Events, Interaction } from 'discord.js';

export default {
	name: Events.InteractionCreate,
	async execute(interaction: Interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`❌ Error al ejecutar ${interaction.commandName}:`, error);
				await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
			}
		} else if (interaction.isButton()) {
			const { getQueue } = await import('@/player/queue');
			const data = getQueue(interaction.guild!.id);
			if (!data) return interaction.reply({ content: '❌ No hay música reproduciéndose.', ephemeral: true });

			switch (interaction.customId) {
				case 'pause':
					data.player.pause();
					return interaction.reply({ content: '⏸️ Música pausada', ephemeral: true });
				case 'resume':
					data.player.unpause();
					return interaction.reply({ content: '▶️ Reanudado', ephemeral: true });
				case 'skip':
					data.player.stop();
					return interaction.reply({ content: '⏭️ Saltando...', ephemeral: true });
				case 'stop':
					data.player.stop();
					data.connection.destroy();
					return interaction.reply({ content: '⏹️ Música detenida.', ephemeral: true });
			}
		}
	},
};

