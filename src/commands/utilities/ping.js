const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping bot availability",
    category: "utilities",
    async execute (client, message) {
        const pingMessage = await message.channel.send("Ping?");
        await pingMessage.edit(`🏓   *PONG*, Latency is ${pingMessage.createdTimestamp - message.createdTimestamp}ms.`);
    }
};