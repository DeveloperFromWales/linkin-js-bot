require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const logger = require('./logger');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    logger.info('Linkin is now live.');
});

client.on('error', (error) => {
    logger.error(`Linkin encountered an error: ${error.message}`);
});

client.login(process.env.TOKEN);