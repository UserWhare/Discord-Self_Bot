const Discord = require("discord.js-selfbot-v11");
const config = require("./../config.json");
const dono = config.dono;

exports.run = async (client, message, args) => {
  if (message.author.id !== dono) {
    return message.reply("❌ Você não tem permissão para usar esse comando.")
      .then(msg => msg.delete(8000));
  }

  const avatarUrl = args[0];
  if (!avatarUrl) {
    return message.reply("⚠️ Por favor, envie a URL do avatar para atualizar.")
      .then(msg => msg.delete(8000));
  }

  try {
    await client.user.setAvatar(avatarUrl);
    await message.reply("✅ Avatar atualizado com sucesso!")
      .then(msg => msg.delete(10000));
  } catch (error) {
    console.error("Erro ao atualizar avatar:", error);
    message.reply("❌ Não foi possível atualizar o avatar. Verifique a URL e tente novamente.")
      .then(msg => msg.delete(10000));
  }

  message.delete().catch(() => {});
};
