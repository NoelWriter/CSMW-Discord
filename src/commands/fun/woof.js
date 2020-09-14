const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "woof",
    description: "Shows random dog picture",
    category: "fun",
    aliases: ["dog"],
    async execute(client, message) {
        await (async () => {
            try {
                const res = await superagent.get('https://dog.ceo/api/breeds/image/random').then(res => {
                    const embed = new MessageEmbed()
                        .setTimestamp()
                        .setFooter(message.author.username)
                        .setColor("DARK_PURPLE")
                        .setImage(res.body.message);

                    message.channel.send(embed);
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }
};
