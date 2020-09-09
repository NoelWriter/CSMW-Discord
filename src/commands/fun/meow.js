const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "meow",
    description: "Shows random cat picture",
    category: "fun",
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
            } catch (err) {
                console.error(err);
            }
        })();
    }
};
