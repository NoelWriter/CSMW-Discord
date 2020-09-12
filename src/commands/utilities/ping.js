const { MessageEmbed } = require("discord.js");
const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "ping",
    description: "Ping bot availability",
    category: "utilities",
    async execute (client, message) {
        try {
            const pingMessage = await message.channel.send(">>> Ping?");
            await pingMessage.edit(`>>> 🏓  *PONG*, Latency is ${pingMessage.createdTimestamp - message.createdTimestamp}ms.`);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};