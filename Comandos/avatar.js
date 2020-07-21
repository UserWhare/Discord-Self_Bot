const Discord = require("discord.js");
const config = require("./../config.json");
var dono = config.dono;

exports.run = async (client, message, args) => {
    if (!dono.includes(message.author.id)) return message.channel.send(`**<@${message.author.id}>, Você não tem permissão para usar esse comando**`).then(msg => msg.delete(10000));
    if (message.author.id === dono) {
    client.user.setAvatar(args[0]).then(async () => {
        await message.reply("**✅ » Avatar Atualizado Com Sucesso**").then(msg => msg.delete(10000)).catch(err => console.log(err))
    })
    }
}
