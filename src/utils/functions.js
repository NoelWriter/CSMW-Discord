// This file contains several functions used in commands.
const moment = require("moment");

module.exports = {
    formatDate(date) {
        return moment(date).format("DD/MM/YYYY");
    },

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
}