// ----------------------------------------------------------------
//                            csmw.io
// ----------------------------------------------------------------

// Bot entrypoint
const { Client, Collection } = require("discord.js");
const config = require("../config.json");
const chalk = require("chalk");

// Init client
const client = new Client();

// Collections
client.commands = new Collection();
client.aliases = new Collection();

// Utilities
require("./utils/command")(client);
require("./utils/events")(client);

// Bot login functionality
client.login(config.BOT_TOKEN);

// Error handling
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

