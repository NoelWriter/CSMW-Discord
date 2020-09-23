// This file contains several functions used in commands.
const moment = require("moment");
const config = require("../../config.json");
const { dbQuery } = require("../utils/database")

module.exports = {
    formatDate(date) {
        return moment(date).format("DD/MM/YYYY");
    },

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    getPrefix(client) {
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const messagePrefix = config.BOT_PREFIX;
        return new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(messagePrefix)})\\s*`);
    },

    notifyOwner(client, message, error, commandname) {
        client.users.cache.get(config.BOT_OWNER_ID).send(`${message.author.username} has executed ${commandname} and got back the following error :\n\`\`\`${error}\`\`\``);
    },

    async getUsers() {
        const result = await dbQuery("SELECT * FROM users");
        console.log(result);
        return result
    },

    async getUserById(id) {
        const result = await dbQuery(`SELECT * FROM users WHERE id = ${id}`);
        console.log(result);
        return result
    }

}