
module.exports = {
    name: "say",
    description: "Let's bot say the given arguments",
    category: "manager",
    aliases: [],
    async execute (client, message, args) {
        try {
            const say = args.join(" ");
            await message.channel.send(say).then(() => {
                message.delete();
            });
        } catch (error) {
            notifyOwner(client, message, error, this.name);
        }
    }
};