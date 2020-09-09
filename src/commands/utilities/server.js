const { MessageEmbed } = require("discord.js");
const regions = require("../../data/regions.json");
const { formatDate, capitalize } = require("../../utils/functions");

module.exports = {
    name: "serverinfo",
    description: "Show server information",
    category: "utilities",
    async execute (client, message, args) {
        let server = message.guild;

        if (args)
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
            .addField("**Server Owner**", server.owner, true)
            .addField("**Roles Count**", server.roles.cache.size, true)
            .addField("**Channel Count**", server.channels.cache.size, true)
            .addField("**Emoji Count**", server.emojis.cache.size, true)
            .addField("**Member Count**", server.memberCount, true)
            .addField("**Partnered**", server.partnered, true)
            .addField("**Created At**", formatDate(server.createdAt), true)
            .addField("**Joined At**", formatDate(message.member.joinedAt), true)
            .addField("**Region**", region, true)
            .addField("**Boosts**", server.premiumSubscriptionCount, true)
            .addField("**Boost Level**", server.premiumTier, true)
            .addField("**Shard ping**", server.shard.ping, true)
            .setImage(server.bannerURL({format: "png", dynamic: true, size: 2048}))
            .setTimestamp()
            .setFooter(message.author.username)

        await message.channel.send(embed);
    }
};