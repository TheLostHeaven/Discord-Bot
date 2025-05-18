import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN || "Token123";
export const PUBLICKEY = process.env.publicKey || "NoIdToken"
export const YOUTUBETOKEN = process.env.youtubeToken ;
export const CLIENTIDDISCORD = process.env.clientIdDiscordBot || "NoIdToken"
export const GUILDID = process.env.guildID || "idddddd";


