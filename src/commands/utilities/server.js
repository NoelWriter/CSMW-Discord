const { MessageEmbed } = require("discord.js");
const regions = require("../../data/regions.json");
const { formatDate, capitalize, notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "serverinfo",
    description: "Show server information",
    category: "utilities",
    aliases: ["server"],
    async execute (client, message, args) {
        try {
            let server = message.guild;

            if (args[0])
                server = await client.guilds.fetch(args[0]);

            const regionKey = server.region;
            const regionFlag = regions.filter((region) =>
                region.keys.includes(regionKey)
            )[0].flag;
            const region = `${regionFlag} ${capitalize(regionKey)}`;

            const embed = new MessageEmbed()
                .setTitle(server.name)
                .setThumbnail(server.iconURL({ dynamic: true, size: 1024 }))
                .setColor("DARK_PURPLE")
                .addField("Server Information", `
**Owner:** ${server.owner}
**Member Count:** ${server.memberCount}
**Emoji Count:** ${server.emojis.cache.size}
**Roles Count:** ${server.roles.cache.size}
**Channel Count:** ${server.channels.cache.size}
**Shard Ping:** ${server.shard.ping}
                `, true)
                .addField("\u200b", `
**Region:** ${region}
**Created At:** ${formatDate(server.createdAt)}
**Joined At:** ${formatDate(message.member.joinedAt)}
**Partnered:** ${server.partnered}
**Boosts:** ${server.premiumSubscriptionCount}
**Boost Level:** ${server.premiumTier}
                `, true)
                .setImage(server.bannerURL({format: "png", dynamic: true, size: 2048}))
                .setTimestamp()
                .setFooter(message.author.username)

            await message.channel.send(embed);
        } catch (error) {
            if (error.httpStatus === 403)
                return message.channel.send(`>>> Specified server is not part of bot network`);

            if (error.httpStatus === 400)
                return message.channel.send(`>>> Specified server does not exist`);

            console.log(error)
            notifyOwner(client, message, error, this.name);
        }
    }
};