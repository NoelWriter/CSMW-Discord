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

client.login(config.BOT_TOKEN);


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



// // Create asynchronous process to handle input
// (async () => {
//
//     // Register commands
//     client.commands = new Collection();
//     commands.forEach((commands) => client.commands.set(commands.name, commands));
//
//     client.on('error', (e) => console.error(e));
//     client.on('warn', (e) => console.warn(e));
//     client.on('ready', onReady);
//     client.on('message', (message) => handleMessage(message));
//
//     client.login(config.BOT_TOKEN)
//         .catch((error) => {
//             console.error('Error authenticating with Discord! Check your internet connection and bot token.',
//                 error.message);
//             console.debug(error);
//             process.exit(1);
//         });
// })();
//
// async function onReady() {
//     console.info(`Logged in as ${client.user.tag}!`);
// }