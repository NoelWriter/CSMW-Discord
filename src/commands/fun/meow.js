const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');
const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "meow",
    description: "Shows random cat picture",
    category: "fun",
    aliases: ["cat"],
    async execute(client, message) {
        await (async () => {
            try {
                const res = await superagent.get('http://aws.random.cat/meow').then(res => {
                    const embed = new MessageEmbed()
                        .setTimestamp()
                        .setFooter(message.author.username)
                        .setColor("DARK_PURPLE")
                        .setImage(res.body.file);

                    message.channel.send(embed);
                });
            } catch (error) {
                notifyOwner(client, message, error, this.name);
            }
        })();
    }
};
