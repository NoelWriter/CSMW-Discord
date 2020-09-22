const { MessageEmbed } = require("discord.js");
const regions = require("../../data/regions.json");
const { formatDate, notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "userinfo",
    description: "Show user information",
    category: "utilities",
    aliases: ["user", "userinfo"],
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
                .setDescription(`
**User ID:** ${guildMember.id}
**User tag:** ${guildMember.user.tag}
**Created At:** ${formatDate(guildMember.user.createdAt)}
**Joined At:** ${formatDate(guildMember.user.joinedAt)}
**Highest Role:** ${guildMember.roles.hoist}
**Current Status:** ${guildMember.presence.status}
                `)
                .setTimestamp()
                .setFooter(message.author.username)

            await message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};