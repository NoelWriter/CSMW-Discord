const { MessageEmbed } = require("discord.js");
const { capitalize, formatDate } = require("../../utils/functions");

module.exports = {
    name: "botinfo",
    description: "Shows bot information",
    category: "utilities",
    async execute (client, message) {
        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("DARK_PURPLE")
            .setTitle("csmw.io")
            .addField("**Created At**", formatDate(client.createdAt), true)

        await message.channel.send(embed);
    }
};