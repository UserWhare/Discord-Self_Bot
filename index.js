const Discord = require("discord.js");
const Enmap = require("enmap");
const client = new Discord.Client();
const config = require("./config.json");
var token = config.token;
var prefix = config.prefix;

client.Comandos = new Enmap();

client.on("message", message => {
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  try {
    let commandFile = require(`./Comandos/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    if (err.code == "MODULE_NOT_FOUND") return;
    console.error("Error");
  }
});

client.on("ready", () => {
console.log(`==========================\n[${client.users.size}] ~ Usuários\n[${client.channels.size}] ~ Canais\n[${client.guilds.size}] ~ Servidores\n==========================\n${client.user.username} ~ ID: ${client.user.id}\n[Pronto Pra Divulgar]`);

let status = [
  {name: `WORLD$TAR MONEY`, type: `LISTENING`},
  {name: `${client.users.size} Usuários`, type:`WATCHING`},
  {name: `Convites`, type: `PLAYING`}
]

  function setStatus() {
    let randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setPresence({ game: randomStatus });
  }
  setStatus();
  setInterval(() => setStatus(), 10000);
});
client.login(token);
