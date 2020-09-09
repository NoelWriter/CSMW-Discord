// This file contains several functions used in commands.
const moment = require("moment");
const config = require("../../config.json");

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
}