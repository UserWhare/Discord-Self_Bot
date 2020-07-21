const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let uptime = hrs+mins+sec
  let string = ' ';
  var hrs = Math.round(client.uptime / (1000 * 60 * 60)) + " Horas,"
  var mins = " " + Math.round(client.uptime / (1000 * 60)) % 60 + " Minutos,"
  var sec = Math.round(client.uptime / 1000) % 60 + " Segundos"
  const ksp = "󠂪󠂪"

  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60
  
  if (hrs == "0 Horas,") hrs = ""
  if (mins == " 0 Minutos, ") mins = ""
    
    message.delete().catch(O_o=>{});
    client.guilds.forEach(guild => {
    string += `${guild.name} ` + '\n';})

    let botembed = new Discord.RichEmbed()
        .setColor("#00ff44")
        .addField("**Tempo online:**", `**\`\`\`Dias: ${days} | Horas: ${hours} | Minutos: ${minutes} | Segundos: ${seconds.toFixed(0)}\`\`\`**`, false)
        .addField("**Atualmente Em:**", `**\`\`\` ${client.guilds.size} Servidores\`\`\`**`, false)
        .addField(`**Total De Membros Em ${client.guilds.size} Servidores:**`, `**\`\`\` ${client.users.size} Membros\`\`\`**`, false)
        .setTimestamp()
        .setThumbnail("https://i.imgur.com/5bS1c97.png")
        .setFooter(`• Comando Solicitado Por: ${message.author.username}`, message.author.avatarURL)
    message.channel.send(botembed).then(msg => msg.delete(30000))
}