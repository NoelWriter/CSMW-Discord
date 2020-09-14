const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: 'ban',
    description: "Bans a user",
    category: "utilities",
    aliases: [],
    async execute (client, message) {
        try {
            let isAbleToBan = message.member.hasPermission("BAN_MEMBERS");

            if (isAbleToBan) {
                let userToBan = message.mentions.members.first() || { bannable: false };
                if (userToBan.bannable) {
                    userToBan.ban();
                } else {
                    message.reply('nope');
                }
            } else {
                message.reply('You are not permitted to ban');
            }
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
}
