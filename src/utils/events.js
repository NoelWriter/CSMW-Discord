const fs = require("fs");

module.exports = (client) => {
    const eventFiles = fs
        .readdirSync("./events")
        .filter((file) => file.endsWith(".js")
    );

    eventFiles.forEach((file) => {
        const event = require(`../events/${file}`);

        evaluateErrors(event, file);

        client.on(event.name, event.execute.bind(null, client));
        delete require.cache[require.resolve(`../events/${file}`)];
    })
}

function evaluateErrors(event, file) {
    if (!event.execute)
        throw new TypeError(
            `[ERROR] | ${file} requires execute function.`
        );

    if (!event.name)
        throw new TypeError(
            `[ERROR] | ${file} name is required for events.`
        );
}