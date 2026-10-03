const { delay, resolveRecipients, safeDelete } = require("../src/utils");
const { log } = require("../src/logger");

let running = false;

module.exports = {
    name: "div",

    async run({ client, message, args, config }) {
        const content = args.join(" ").trim();

        if (!content) {
            const reply = await message.reply("Informe a mensagem que deseja enviar.");
            safeDelete(reply, 8000);
            return;
        }

        if (content.length > 1900) {
            const reply = await message.reply("A mensagem deve ter no máximo 1900 caracteres.");
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

        running = true;
        safeDelete(message);

        const status = await message.channel.send(`Enviando para ${recipients.length} destinatário(s) configurado(s)...`);
        let sent = 0;
        let failed = 0;

        try {
            for (const user of recipients) {
                try {
                    await user.send(content);
                    sent += 1;
                    log(`Mensagem enviada para ${user.tag || user.username}`);
                } catch {
                    failed += 1;
                    log(`Falha ao enviar para ${user.tag || user.username}`);
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
