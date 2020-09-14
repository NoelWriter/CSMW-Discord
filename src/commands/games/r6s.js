const { MessageEmbed } = require("discord.js");
const { notifyOwner,  } = require("../../utils/functions");
const dateFormat = require('dateformat');
const config = require("../../../config.json");
const R6API = require('r6api.js');
const moment = require("moment");

module.exports = {
    name: "r6s",
    description: "Show r6s stats",
    category: "games",
    aliases: ["siege", "r6"],
    async execute (client, message, args) {
        try {
            const r6api = new R6API(config.BOT_R6S_UBISOFT_EMAIL, config.BOT_R6S_UBISOFT_PASSWORD);

            if (!args[0] || !args[1])
                return message.channel.send(">>> Please provide both the platform and the player name (uplay, xbl, psn)")

            const username = args.slice(1, args.length).join(" "),
                platform = args[0];

            const res = await r6api.getId(platform, username);

            if (res.length === 0)
                return message.channel.send(">>> User ID not found");

            const id = res[0].userId
            const stats = await r6api.getStats(platform, id).then(res => res[0]);
            const rankStats = await r6api.getRank(platform, id).then(res => res[0]);
            const levelStats = await r6api.getLevel(platform, id).then(res => res[0]);
            const playtimeStats = await r6api.getPlaytime(platform, id).then(res => res[0]);

            if (!stats || !rankStats || !levelStats || !playtimeStats)
                return message.channel.send(">>> User stats not found");

            let firstKey = Object.keys(rankStats.seasons)[0];
            let latestSeason = rankStats.seasons[firstKey];

            firstKey = Object.keys(latestSeason.regions)[0];
            let currentStatus = latestSeason.regions[firstKey].current;
            for (const region in latestSeason.regions) {
                if (region.matches > 0) {
                    currentStatus = region.current;
                    break;
                }
            }

            const playtimeGeneral = moment.duration(playtimeStats.general, "seconds");

            const embed = new MessageEmbed()
                .setTitle(username)
                .setColor("DARK_PURPLE")
                .setThumbnail(currentStatus.image)
                .addField("**Kills**", stats.pvp.general.kills, true)
                .addField("**Deaths**", stats.pvp.general.deaths, true)
                .addField("**KD Ratio**", getKDRatio(stats.pvp.general.kills, stats.pvp.general.deaths), true)
                .addField("**Player Level**", levelStats.level, true)
                .addField("**Playtime**", getPlaytimeString(playtimeGeneral), true)
                .addField("**Headshot %**", getHeadshotPercentage(stats.pvp.general.kills, stats.pvp.general.headshots) + '%', true)
                .addField("**Matches Played**", stats.pvp.general.matches, true)
                .addField("**Wins**", stats.pvp.general.wins, true)
                .addField("**Losses**", stats.pvp.general.losses, true)
                .addField("**Win Loss Ratio**", getWinLossRatio(stats.pvp.general.wins, stats.pvp.general.losses), true)
                .addField("**Current Rank**", currentStatus.name , true)
                .addField("**Current MMR**", currentStatus.mmr, true)
                .setTimestamp()
                .setFooter(message.author.username)

            await message.channel.send(embed);
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};

function getKDRatio(kills, deaths) {
    return parseFloat(kills / deaths).toFixed(2);
}

function getHeadshotPercentage(kills, headshots) {
    return parseFloat((headshots / kills) * 100 ).toFixed(2);
}

function getWinLossRatio(wins, losses) {
    return parseFloat(wins / losses).toFixed(2);
}

function getPlaytimeString(playtime) {
    const months = playtime.get('months');
    const days = playtime.get('days');
    const hours = playtime.get('hours');
    if (months > 0)
        return `${months}m ${days}d ${hours}h`;
    else
        return `${days}d ${hours}h`;
}