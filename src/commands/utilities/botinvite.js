const { MessageEmbed } = require("discord.js");
const { notifyOwner } = require("../../utils/functions");
const config = require("../../../config.json");

module.exports = {
    name: "botinvite",
    description: "Shows bot invite link",
    category: "utilities",
    aliases: ["invite", "invitebot"],
    async execute (client, message) {
        try {
            const url = `https://discord.com/oauth2/authorize?client_id=${config.BOT_CLIENT_ID}&scope=bot&permissions=8&redirect_uri=csmw.io`

            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(message.author.username)
                .setColor("DARK_PURPLE")
                .setDescription(`[Invite link](${url}`)

            await message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};