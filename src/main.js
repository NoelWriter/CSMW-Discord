// ----------------------------------------------------------------
//                            csmw.io
// ----------------------------------------------------------------

//https://github.com/Dev-CasperTheGhost/ghostybot/blob/master/src/utils/events.js

// Bot entrypoint
const { Client, Collection } = require("discord.js");
const config = require("../config.json");
const chalk = require("chalk");

// Init client
const client = new Client();

client.commands = new Collection();

require("./utils/command")(client);
require("./utils/events")(client);

client.on('ready', onReady);
client.login(config.BOT_TOKEN);

async function onReady() {
    console.info(`Logged in as ${client.user.tag}!`);
}

// Unhandled errors
process.on('SIGINT', () => {
    process.exit();
});

process.on("unhandledRejection", (error) =>
    console.error(chalk.redBright(`Uncaught Error ${error}`))
);

process.on("typeerror", (error) =>
    console.error(chalk.redBright(`Uncaught Error ${error}`))
);

process.on("uncaughtExceptionMonitor", (error) => {
    console.error(chalk.redBright(`Uncaught Exception ${error}`));
});

process.on("warning", (warning) => {
    console.warn(chalk.yellow(`Warning ${warning}`));
});
