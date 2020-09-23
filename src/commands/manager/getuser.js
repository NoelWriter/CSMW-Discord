const { getUserById, notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "dbuser",
    description: "Let's bot say the given arguments",
    category: "manager",
    aliases: [],
    async execute (client, message, args) {
        try {
            await message.channel.send(`\`\`\`${JSON.stringify(await getUserById(args[0]))}\`\`\``)

        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};