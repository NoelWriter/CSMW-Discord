const { MessageEmbed } = require("discord.js");
const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: 'servericon',
    description: 'Shows server icon',
    category: 'utilities',
    aliases: ['icon', 'server-icon', 'serverIcon'],
    async execute (client, message) {
        try {
            let icon = message.guild.iconURL({
                dynamic: true,
                size: 1024
            });

            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(message.author.username)
                .setColor("DARK_PURPLE")
                .setTitle(message.guild.name)
                .setImage(icon);

            message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error);
        }
    }
}
