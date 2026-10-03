module.exports = {
    name: "help",
    aliases: ["ajuda"],

    async run({ message, config }) {
        const lines = [
            `Prefixo: ${config.prefix}`,
            "",
            `${config.prefix}status`,
            `${config.prefix}nome <novo nome>`,
            `${config.prefix}avatar <url>`,
            `${config.prefix}div <mensagem>`,
            `${config.prefix}divembed <titulo> | <mensagem>`,
            "",
            "Os comandos de divulgação usam somente os IDs configurados em RECIPIENT_IDS."
        ];

        await message.channel.send(`\`\`\`\n${lines.join("\n")}\n\`\`\``);
    }
};
