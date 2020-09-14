const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');
const config = require("../../../config.json");
const { capitalize, notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "weather",
    description: "See the weather in a specified country/city",
    category: "util",
    aliases: [],
    async execute(client, message, args) {
        const query = args.join(" ");

        if (!query) return message.channel.send(">>> Please provide a city/country");

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${config.BOT_WEATHER_API_KEY}&units=metric`;

        try {
            await superagent.get(url).then(res => {
                const body = res.body;
                const main = body.main;

                const embed = new MessageEmbed()
                    .setTimestamp()
                    .setFooter(message.author.username)
                    .setColor("DARK_PURPLE")
                    .setTitle(`${body.name}, ${body.sys.country}`)
                    .addField("**Description**", `${capitalize(body.weather[0].description)}`, true)
                    .addField("**Current Temperature**", `${main.temp}°C`, true)
                    .addField("**Experienced Temperature**", `${main.feels_like}°C`, true)
                    .addField("**Pressure**", `${main.pressure}hPa`, true)
                    .addField("**Humidity**", `${main.humidity}%`, true)
                    .addField("**Visbility**", `${body.visibility}m`, true)

                message.channel.send(embed);
            });
        } catch (error) {
            if (error.status === 401)
                return message.channel.send(">>> API key is invalid or incorrect!");

            if (error.status === 404)
                return message.channel.send(`>>> City: **${query}** was not found!`);

            notifyOwner(client, message, error, this.name);
        }
    },
};