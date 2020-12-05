const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: 'ban',
    description: "Bans a user",
    category: "admin",
    aliases: [],
    async execute (client, message) {
        try {
            let isAbleToBan = message.member.hasPermission("BAN_MEMBERS");

            if (isAbleToBan) {
                let userToBan = message.mentions.members.first() || { bannable: false };
                if (userToBan.bannable)
                    userToBan.ban();
                else message.channel.send(`>>> ${message.member} The specific user is not bannable`);
            } else {
                message.channel.send(`>>> ${message.member} You do not have the required permissions to execude this command`);
            }
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
}
