const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows help commands",
    category: "utilities",
    async execute (client, message) {
        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("DARK_PURPLE")
            .setDescription(`[Available commands](https://csmw.io/commands)`)

        await message.channel.send(embed);
    }
};