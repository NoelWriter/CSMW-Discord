const fs = require("fs");
const {sep} = require("path");
const chalk = require("chalk");
const {Collection} = require("discord.js");

module.exports = (client) => {
    let dir = "./commands";
    fs.readdirSync(dir).forEach((dirs) => {
        const commands = fs
            .readdirSync(`${dir}${sep}${dirs}${sep}`)
            .filter((f) => f.endsWith(".js"));

        for (const file of commands) {
            const command = require(`../commands/${dirs}/${file}`);

            evaluateErrors(command, file);

            client.commands.set(command.name, command);
        }
    })
}

function evaluateErrors(command, file) {
    if (!command.execute)
        throw new TypeError(
            `[ERROR] | ${file} requires execute function.`
        );

    if (!command.name)
        throw new TypeError(
            `[ERROR] | ${file} name is required for commands.`
        );

    if (command.name.trim() === "")
        throw new TypeError(
            `[ERROR] | ${file} name cannot be empty.`
        );

    if (!command.category)
        console.warn(
            chalk.yellow(
                `[WARNING] | ${cmd.name} has no set category and will therefore not show up in the help listing.`
            )
        );
}