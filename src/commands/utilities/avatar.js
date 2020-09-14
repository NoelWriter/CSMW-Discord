const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Shows avatar",
    category: "utilities",
    aliases: ["picca"],
    async execute (client, message) {

        try {
            let user = message.mentions.users.first() || message.author;
            username = user.username;
            avatar = user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 1024
            });

            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(message.author.username)
                .setColor("DARK_PURPLE")
                .setTitle(username)
                .setImage(avatar);

        message.channel.send(embed);
        } catch (error) {
            console.error(error);
        }
    }
}
