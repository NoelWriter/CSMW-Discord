module.exports = {
    name: "ready",
    execute(client) {
        const serverCount = client.guilds.cache.size;
        const userCount = client.users.cache.filter((u) => !u.bot).size;
        const channelCount = client.channels.cache.size;

        console.log(
            `--------------------------------------------------------------------\n[CSMW.IO]: Logged in as ${client.user.tag}!\nBot is running with ${channelCount} channels,  ${userCount} users and ${serverCount} servers\n--------------------------------------------------------------------\n`
        );
    },
};