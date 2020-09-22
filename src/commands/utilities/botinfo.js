const { MessageEmbed } = require("discord.js");
const { formatDate, notifyOwner } = require("../../utils/functions");
const config = require("../../../config.json");

module.exports = {
    name: "botinfo",
    description: "Shows bot information",
    category: "utilities",
    aliases: ["bot", "info"],
    async execute (client, message) {
        try {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(message.author.username)
                .setColor("DARK_PURPLE")
                .setTitle("csmw.io")
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 1024 }))
                .addField("**Created By**", await client.users.fetch(config.BOT_OWNER_ID), true)
                .addField("**Created At**", formatDate(client.createdAt), true)
                .addField("**Repository**", "[Github](https://github.com/NoelWriter/CSMW-Discord)", true)
                .addField("**Website**", "[csmw.io](https://csmw.io/)", true)
                .addField("**Prefix**", config.BOT_PREFIX, true)
                .addField("**Users**", client.users.cache.size, true)
                .addField("**Servers**", client.guilds.cache.size, true)
                .addField("**Status**", client.user.presence.status, true)
                .addField("**RAM Usage**", `${( process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true);

            await message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }

    }
};