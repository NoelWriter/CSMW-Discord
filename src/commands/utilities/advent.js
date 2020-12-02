const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');
const { notifyOwner } = require("../../utils/functions");
const config = require("../../../config.json");

module.exports = {
    name: "advent",
    description: "Shows advent of code leaderboard for HBO-ICT",
    category: "utilities",
    aliases: ["adventofcode", "aoc"],
    async execute(client, message) {
        await (async () => {
            try {
                const res = await superagent.get('https://adventofcode.com/2020/leaderboard/private/view/1062250.json').set('Cookie', `session=${config.AOC_SESSION_COOKIE}`).then(res => {
                    const resData = JSON.parse(res.text).members

                    let index = [];
                    let memberData = [];
                    for (let memberIndex in resData) {
                        index.push(memberIndex);
                        let memberName = resData[memberIndex].name
                        let memberStars = resData[memberIndex].stars
                        memberData.push({name: memberName,stars: memberStars})
                    }

                    memberData.sort(function (a, b) {
                        return b.stars - a.stars;
                    })

                    let memberMapName = memberData.map((member) => `${member.name}`).join("\n");
                    let memberMapScore = memberData.map((member) => `${member.stars}`).join("\n");

                    const embed = new MessageEmbed()
                        .setTimestamp()
                        .setTitle("Advent of Code 2020")
                        .addField('Name', memberMapName, true)
                        .addField('Stars', memberMapScore, true)
                        .setDescription("Code to join the Leaderboard : \`1062250-4db910b2\`")
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
