const { getUsers } = require("../../utils/functions");

module.exports = {
    name: "users",
    description: "Let's bot say the given arguments",
    category: "manager",
    aliases: [],
    async execute (client, message) {
        try {
            await message.channel.send(JSON.stringify(await getUsers()))

        } catch (error) {
            console.log(error)
        }
    }
};