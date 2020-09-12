const { MessageEmbed } = require("discord.js");
const regions = require("../../data/regions.json");
const { formatDate, notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "userinfo",
    description: "Show user information",
    category: "utilities",
    async execute (client, message, args) {
        try {
            const guildMember =
                message.guild.members.cache.get(args.join(" ")) ||
                message.mentions.members.first() ||
                message.member;

            if (!guildMember) return message.channel.send("User wasn't found!");

            const embed = new MessageEmbed()
                .setTitle(guildMember.displayName)
                .setThumbnail(guildMember.user.avatarURL({ dynamic: true, size: 1024 }))
                .setColor("DARK_PURPLE")
                .addField("**User ID**", guildMember.id, true)
                .addField("**User tag**", guildMember.user.tag , true)
                .addField("**Created At**", formatDate(guildMember.user.createdAt), true)
                .addField("**Joined At**", formatDate(guildMember.user.joinedAt), true)
                .setTimestamp()
                .setFooter(message.author.username)

            await message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};