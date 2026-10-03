const { safeDelete } = require("../src/utils");

module.exports = {
    name: "avatar",

    async run({ client, message, args }) {
        const url = args[0];

        if (!url || !/^https?:\/\/\S+$/i.test(url)) {
            const reply = await message.reply("Informe uma URL válida para o avatar.");
            safeDelete(reply, 8000);
            return;
        }

        try {
            await client.user.setAvatar(url);
            const reply = await message.reply("Avatar atualizado.");
            safeDelete(reply, 8000);
            safeDelete(message);
        } catch {
            const reply = await message.reply("Não foi possível atualizar o avatar.");
            safeDelete(reply, 8000);
        }
    }
};
