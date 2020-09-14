const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');
const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "dankmeme",
    description: "Shows random dank meme picture",
    category: "fun",
    aliases: ["meme"],
    async execute(client, message) {
        await (async () => {
            try {
                const res = await superagent.get('https://www.reddit.com/r/dankmemes/random.json').then(res => {

                    const resData = JSON.parse(res.text)[0].data.children[0].data;

                    if (resData.is_video === true || resData.post_hint !== 'image')
                        return this.execute(client, message);

                    const resUrl = resData.url_overridden_by_dest;
                    const resTitle = resData.title;

                    const embed = new MessageEmbed()
                        .setTimestamp()
                        .setFooter(message.author.username)
                        .setColor("DARK_PURPLE")
                        .setTitle(resTitle)
                        .setImage(resUrl);

                    message.channel.send(embed);
                });
            } catch (error) {
                notifyOwner(client, message, error, this.name);
            }
        })();
    }
};
