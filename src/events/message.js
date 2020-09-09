const chalk = require("chalk");
const { getPrefix } = require("../utils/functions");

module.exports = {
    name: "message",
    async execute(client, message) {

        const userId = message.author.id;
        const prefix = getPrefix(client);

        if (
            !prefix.test(message.content) ||
            message.author.bot ||
            userId === client.user.id
        )
            return;

        const [, matchedPrefix] = message.content.match(prefix);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        try {
            if (client.commands.has(command)) {
                const cmd = client.commands.get(command);
                console.log(chalk.green(`${message.author.name} | used command ${cmd.name}`));

                await cmd.execute(client, message, args);
            }
            else
                return;

        } catch (e) {
            console.log(e);
        }
    },
};

