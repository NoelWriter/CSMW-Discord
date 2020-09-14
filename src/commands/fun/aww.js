const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "aww",
    description: "Shows random cute picture",
    category: "fun",
    aliases: ["cute"],
    async execute(client, message) {
        await (async () => {
            try {
                const res = await superagent.get('https://www.reddit.com/r/aww/random.json').then(res => {

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
            } catch (err) {
                console.error(err);
            }
        })();
    }
};
