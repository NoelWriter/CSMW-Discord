const { MessageEmbed } = require("discord.js");
const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "github",
    description: "Shows github repo link",
    category: "utilities",
    aliases: [],
    async execute (client, message) {
        try {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(message.author.username)
                .setColor("DARK_PURPLE")
                .setDescription(`[Github repository](https://github.com/NoelWriter/CSMW-Discord)`)

            await message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};