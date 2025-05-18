import { Collection } from 'discord.js';
import { SlashCommand } from './command';

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, SlashCommand>;
	}
}
