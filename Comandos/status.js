const Discord = require("discord.js-selfbot-v11");

exports.run = async (client, message, args) => {
  // Calcula uptime
  const totalSeconds = Math.floor(client.uptime / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Gera lista de servidores
  const guildNames = client.guilds.map(guild => guild.name).join('\n');

  // Tenta deletar a mensagem original
  message.delete().catch(() => {});

  // Monta embed
  const embed = new Discord.RichEmbed()
    .setColor("#00ff44")
    .addField("⏱️ Tempo online:", `\`\`\`Dias: ${days} | Horas: ${hours} | Minutos: ${minutes} | Segundos: ${seconds}\`\`\``)
    .addField("🌐 Servidores conectados:", `\`\`\`${client.guilds.size}\`\`\``)
    .addField(`👥 Total de membros em todos os servidores:`, `\`\`\`${client.users.size}\`\`\``)
    .addField("📋 Lista de servidores:", guildNames.length > 1024 ? "Muitos servidores para listar." : `\`\`\`${guildNames}\`\`\``)
    .setTimestamp()
    .setFooter(`Solicitado por: ${message.author.username}`, message.author.avatarURL);

  // Envia o embed e apaga depois de 30 segundos
  const sentMessage = await message.channel.send(embed);
  setTimeout(() => sentMessage.delete().catch(() => {}), 30000);
};

exports.help = {
  name: "servidores"
};
