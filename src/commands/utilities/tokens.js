const { MessageEmbed } = require("discord.js");
const { getUserTokenBalance, notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "tokens",
    description: "Returns current token balance of user",
    category: "utilities",
    aliases: ["bal", "balance", "token", "money"],
    async execute (client, message, args) {
        try {
            const tokens = await getUserTokenBalance(message.author.id)
            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(message.author.username)
                .setColor("DARK_PURPLE")
                .setDescription(`You currently own ${tokens} <:galaxytoken:784791957204369429>.`)

            await message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};
