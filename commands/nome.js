const { safeDelete } = require("../src/utils");

module.exports = {
    name: "nome",
    aliases: ["name"],

    async run({ client, message, args }) {
        const name = args.join(" ").trim();

        if (name.length < 2 || name.length > 32) {
            const reply = await message.reply("Informe um nome entre 2 e 32 caracteres.");
            safeDelete(reply, 8000);
            return;
        }

        try {
            await client.user.setUsername(name);
            const reply = await message.reply("Nome atualizado.");
            safeDelete(reply, 8000);
            safeDelete(message);
        } catch {
            const reply = await message.reply("Não foi possível atualizar o nome.");
            safeDelete(reply, 8000);
        }
    }
};
