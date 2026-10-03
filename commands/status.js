const Discord = require("discord.js-selfbot-v11");
const { safeDelete, uptime } = require("../src/utils");

module.exports = {
    name: "status",
    aliases: ["info"],

    async run({ client, message, config }) {
        const embed = new Discord.RichEmbed()
            .setColor("#5865F2")
            .setTitle("Self Bot")
            .addField("Tempo online", uptime(client.uptime), true)
            .addField("Servidores", String(client.guilds.size), true)
            .addField("Usuários em cache", String(client.users.size), true)
            .addField("Prefixo", config.prefix, true)
            .addField("Destinatários configurados", String(config.recipientIds.size), true)
            .setTimestamp();

        safeDelete(message);
        const sent = await message.channel.send(embed);
        safeDelete(sent, 30000);
    }
};
