const Discord = require("discord.js-selfbot-v11");
const config = require("./../config.json");
const dono = config.dono;

exports.run = async (client, message, args) => {
  if (message.author.id !== dono) {
    return message.reply("❌ Apenas o dono pode usar este comando.")
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 8000))
      .catch(() => {});
  }

  const novoNick = args.join(" ");
  if (!novoNick) {
    return message.reply("⚠️ Por favor, informe o novo nickname.")
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 8000))
      .catch(() => {});
  }

  try {
    await client.user.setUsername(novoNick);
    message.reply("✅ Nick atualizado com sucesso!")
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 10000));
  } catch (error) {
    console.error("Erro ao atualizar nickname:", error);
    message.reply("❌ Não foi possível atualizar o nickname. Tente novamente mais tarde.")
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 10000));
  }
};
