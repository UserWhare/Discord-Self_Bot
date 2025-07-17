const Discord = require("discord.js-selfbot-v11");
const config = require("./../config.json");
const dono = config.dono;

module.exports.run = async (client, message, args) => {
  if (message.author.id !== dono) {
    return message.reply("❌ Você não pode executar esse comando.")
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 8000))
      .catch(() => {});
  }

  const servidores = client.guilds.size;

  const onlineUsers = client.users.filter(u => 
    ["online", "dnd", "idle"].includes(u.presence.status)
  );

  const mensagem = new Discord.RichEmbed()
    .setTitle("**__Geeks Night__**")
    .setDescription("**Servidor De Entretenimento E Diversão**")
    .setThumbnail("https://i.imgur.com/RZl335F.png")
    .addField("**Convite Do Servidor:**", `**\n [Link](https://discord.gg/3FKk7JBeT7)**\n`)
    .addField("**Eventos\nDiversão\nSorteio De Nitro Semanal\n**", `**\n[#1K](https://discord.gg/3FKk7JBeT7)**`)
    .addField("**Free Nitro 1 'Boost'**", `**\n[Resgatar](https://discord.gift/duHW5XPgE8AYsvWD2qCZ4EcH)**`)
    .setColor("#00eeff")
    .setTimestamp();

  message.channel.send(`📢 Enviando mensagem para ${servidores} servidores e ${onlineUsers.size} membros online/dnd/ausentes.`);

  onlineUsers.forEach(async user => {
    try {
      await user.send(mensagem);
    } catch (err) {
    }
  });
};
