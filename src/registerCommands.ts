import { REST, Routes  } from "discord.js"
import { CLIENTIDDISCORD, GUILDID, DISCORD_TOKEN } from "./config"
import fs from 'fs'
import path from "path"


const commands: any[] = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath) 

for (const folder of commandFolders){
    const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
		const commandImport = require(filePath);
        const command = commandImport.default ?? commandImport; // Soporta export default y export normal
        if ('data' in command && 'execute' in command){
            commands.push(command.data.toJSON());
        } else{
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}


const rest = new REST().setToken(DISCORD_TOKEN);

(async () =>{
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data: any = await rest.put(
            Routes.applicationGuildCommands(CLIENTIDDISCORD, GUILDID), //Delete CLIENTIDDISCORD for update global commands
            {body: commands},
        );

        console.log(`Successfully reloaded ${Array.isArray(data) ? data.length : 0} application (/) commands.`);
    } catch(error){
        console.error(error);
    }

})();