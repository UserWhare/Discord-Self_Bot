const Discord = require("discord.js");
const talkedRecently = new Set();
const config = require("./../config.json");
var dono = config.dono;

exports.run = async (client, message, args) => {
  if (!dono.includes(message.author.id)) return message.channel.send(`**<@${message.author.id}>, Você não tem permissão para usar esse comando**`).then(msg => msg.delete(10000));

  let mensagem = args.join(" ");
  if (talkedRecently.has(message.author.id)) {
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor("**Espere Para Usar Esse Comando Novamente**", message.author.avatarURL)
      .setImage("https://cdn.discordapp.com/attachments/636703795648135168/640763221694742604/6d78711d7c8438405ee8a5a50114f9ac.gif")
      .setTimestamp()
      .setFooter(`• Comando Solicitado Por: ${message.author.username}`, message.author.avatarURL)
      message.channel.send({ embed }).then(msg => msg.delete(15000)).catch(() => {});

  } else {
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 600000);

    if (!mensagem) return message.reply("**Digite Uma Messagem Para Ser Divulgada**");
    
    let servidores = client.guilds.size;
    let usuarios = client.users.size;

    await client.users.forEach(f => {
      if (f.bot == true) return;
      setTimeout(function(){ 
        f.send(`${mensagem}`)
        .then(ssc => console.log(`Enviada Para: ${ssc.channel.recipient.username}`))
        .catch(err => console.log(`Falha De Envio Para: ${f.username}`));
    }, 20000);
    }),
    message.channel.send(`**${message.author}, DIV Iniciada. Status:**`);
    let embed = new Discord.RichEmbed()
      .setTitle("Divulgação")
      .addField("**Servidores:**", `${servidores}`)
      .addField("**Total De Membros:** ", `${usuarios}`)
      .addField("**Mensagem Da DIV:**", `${mensagem}`)
      .setColor("RANDOM")
      .setThumbnail("https://i.imgur.com/c5u4jWk.png")
    message.channel.send(embed).catch(() => {});
  }
};


