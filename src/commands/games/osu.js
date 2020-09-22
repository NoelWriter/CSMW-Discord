const {MessageEmbed} = require("discord.js");
const {notifyOwner, formatDate} = require("../../utils/functions");
const config = require("../../../config.json");
const osu = require('node-osu');
const moment = require("moment");

module.exports = {
    name: "osu",
    description: "Shows stats from specified osu user",
    category: "games",
    aliases: ["osustats"],
    async execute(client, message, args) {
        await (async () => {
            try {
                const osuApi = new osu.Api(config.BOT_OSU_API_KEY, {
                    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
                    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
                    completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
                    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
                });

                if (!args[0])
                    return message.channel.send(">>> Please provide a valid username")

                const username = args[0];

                await osuApi.getUser({u: username}).then(user => {
                    const playtimeGeneral = moment.duration(user.secondsPlayed, "seconds");

                    const embed = new MessageEmbed()
                        .setTimestamp()
                        .setAuthor(user.name, getCountryFlagURL(user.country), getUserPageURL(user.id))
                        .setThumbnail(getUserAvatarURL(user.id))
                        .setDescription(`
**Rank:** #${user.pp.rank} (#${user.pp.countryRank} ${user.country})
**PP:** ${user.pp.raw}pp
**Level:** ${user.level}
**Plays:** ${user.counts.plays}
**Accuracy:** ${parseFloat(user.accuracy).toFixed(2)}%
**Join Date:** ${formatDate(user.raw_joinDate)}
**Playtime:** ${parseInt(playtimeGeneral.asHours())}h
                        `, true)
                        .setFooter(message.author.username)
                        .setColor("DARK_PURPLE")

                    message.channel.send(embed);
                });

            } catch (error) {
                notifyOwner(client, message, error, this.name);
            }
        })();
    }
};

function getUserAvatarURL(userID) {
    return `https://a.ppy.sh/${userID}?1591393429.jpeg`
}

function getCountryFlagURL(flagShort) {
    return `https://osu.ppy.sh/images/flags/${flagShort}.png`
}

function getUserPageURL(userID) {
    return `https://osu.ppy.sh/users/${userID}`
}