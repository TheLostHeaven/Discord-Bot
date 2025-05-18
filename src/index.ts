import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { SlashCommand } from './types/command';
import { DISCORD_TOKEN } from './config';


const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {
	const files = fs.readdirSync(path.join(commandsPath, folder)).filter(f => f.endsWith('.ts'));
	for (const file of files) {
		const command: SlashCommand = require(path.join(commandsPath, folder, file)).default;
		client.commands.set(command.data.name, command);
	}
}

const eventsPath = path.join(__dirname, 'events');
const events = fs.readdirSync(eventsPath).filter(f => f.endsWith('.ts'));

for (const file of events) {
	const event = require(path.join(eventsPath, file)).default;
	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

client.login(DISCORD_TOKEN);
