const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "github",
    description: "Shows github repo link",
    category: "utilities",
    async execute (client, message) {
        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("DARK_PURPLE")
            .setDescription(`[Github repository](https://github.com/NoelWriter/CSMW-Discord)`)

        await message.channel.send(embed);
    }
};