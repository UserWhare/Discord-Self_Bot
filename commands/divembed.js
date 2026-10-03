const Discord = require("discord.js-selfbot-v11");
const { delay, resolveRecipients, safeDelete } = require("../src/utils");
const { log } = require("../src/logger");

let running = false;

module.exports = {
    name: "divembed",
    aliases: ["divs"],

    async run({ client, message, args, config }) {
        const raw = args.join(" ").trim();
        const separator = raw.indexOf("|");

        if (separator === -1) {
            const reply = await message.reply("Use: divembed <título> | <mensagem>");
            safeDelete(reply, 8000);
            return;
        }

        const title = raw.slice(0, separator).trim();
        const description = raw.slice(separator + 1).trim();

        if (!title || !description) {
            const reply = await message.reply("Título e mensagem são obrigatórios.");
            safeDelete(reply, 8000);
            return;
        }

        if (title.length > 256 || description.length > 1800) {
            const reply = await message.reply("O conteúdo do embed está grande demais.");
            safeDelete(reply, 8000);
            return;
        }

        if (running) {
            const reply = await message.reply("Já existe um envio em andamento.");
            safeDelete(reply, 8000);
            return;
        }

        const recipients = await resolveRecipients(client, config);

        if (!recipients.length) {
            const reply = await message.reply("Nenhum destinatário válido foi configurado em RECIPIENT_IDS.");
            safeDelete(reply, 10000);
            return;
        }

        const embed = new Discord.RichEmbed()
            .setColor("#5865F2")
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();

        running = true;
        safeDelete(message);

        const status = await message.channel.send(`Enviando embed para ${recipients.length} destinatário(s) configurado(s)...`);
        let sent = 0;
        let failed = 0;

        try {
            for (const user of recipients) {
                try {
                    await user.send(embed);
                    sent += 1;
                    log(`Embed enviado para ${user.tag || user.username}`);
                } catch {
                    failed += 1;
                    log(`Falha ao enviar embed para ${user.tag || user.username}`);
                }

                await delay(config.broadcastDelayMs);
            }
        } finally {
            running = false;
        }

        safeDelete(status);
        const result = await message.channel.send(`Envio finalizado. Sucesso: ${sent} | Falhas: ${failed}`);
        safeDelete(result, 15000);
    }
};
