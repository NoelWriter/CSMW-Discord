const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Shows avatar",
    category: "utilities",
    aliases: ["avatar", "picca"],
    async execute (client, message) {
        try {
            avatar = message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 1024
            });
        } catch (error) {
            console.error(error);
        }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("DARK_PURPLE")
            .setTitle("avatar")
            .setImage(avatar);

        message.channel.send(embed);
    }
}
