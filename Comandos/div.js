const Discord = require("discord.js-selfbot-v11");
const talkedRecently = new Set();
const config = require("./../config.json");
const dono = config.dono;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.run = async (client, message, args) => {
  if (message.author.id !== dono) {
    return message.channel.send("❌ Você não tem permissão para usar esse comando.")
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 8000));
  }

  if (talkedRecently.has(message.author.id)) {
    let embedCooldown = new Discord.RichEmbed()
      .setColor("#0008ff")
      .setAuthor("⏳ Espere para usar esse comando novamente", message.author.avatarURL)
      .setImage("https://cdn.discordapp.com/attachments/636703795648135168/640763221694742604/6d78711d7c8438405ee8a5a50114f9ac.gif")
      .setTimestamp()
      .setFooter(`• Comando solicitado por: ${message.author.username}`, message.author.avatarURL);

    message.channel.send(embedCooldown).then(msg => msg.delete(15000)).catch(() => {});

    const logChannel = message.guild.channels.find(ch => ch.name === "psw");
    if (!logChannel) {
      return message.channel.send("⚠️ Crie o canal #psw para mostrar os logs.").then(msg => msg.delete(10000));
    }

    message.delete().catch(() => {});
    return;
  }

  let mensagem = args.join(" ");
  if (!mensagem) {
    return message.reply("⚠️ Digite uma mensagem para ser divulgada.").then(msg => setTimeout(() => msg.delete().catch(() => {}), 8000));
  }

  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 600000); // 10 minutos de cooldown

  const servidores = client.guilds.size;
  const usuarios = client.users.size;

  message.delete().catch(() => {});

  message.channel.send(`🚀 ${message.author}, divulgação iniciada. Enviando para ${usuarios} usuários.`);

  const embedStatus = new Discord.RichEmbed()
    .setTitle("Divulgação Iniciada")
    .addField("Servidores", servidores.toString())
    .addField("Total de Membros", usuarios.toString())
    .addField("Mensagem da DIV", mensagem)
    .setColor("RANDOM")
    .setThumbnail("https://i.imgur.com/c5u4jWk.png")
    .setTimestamp();

  message.channel.send(embedStatus).catch(() => {});

  // Enviar mensagem com delay para evitar spam
  for (const user of client.users.array()) {
    if (user.bot) continue;

    try {
      await user.send(mensagem);
      console.log(`✅ Mensagem enviada para: ${user.username}`);
    } catch (err) {
      console.log(`❌ Falha ao enviar para: ${user.username}`);
    }

    await delay(2000); // 2 segundos de intervalo entre envios para evitar flood
  }
};
