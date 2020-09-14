const { MessageEmbed } = require("discord.js");
const { notifyOwner } = require("../../utils/functions");

module.exports = {
    name: "kick",
    description: "Kick a member",
    category: "utilities",
    aliases: [],
    async execute (client, message) {
        try {
            var member = message.mentions.members.first();

            if (message.member.hasPermission("KICK_MEMBERS")) {
                if (member) {
                    try {
                        member.kick();
                    } catch (error) {
                        message.reply("I do not have permissions to kick " + member);
                        console.log(error);
                    }
                }
            } else {
                message.reply("You do not have permissions to kick " + member);
            }
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};