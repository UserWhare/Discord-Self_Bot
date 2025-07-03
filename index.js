const Discord = require("discord.js-selfbot-v11");
const fs = require("fs");
const Enmap = require("enmap");

const client = new Discord.Client();
const config = require("./config.json");

const token = config.token;
const prefix = config.prefix;

client.Comandos = new Enmap();

// ========================
//      Sistema de Comandos
// ========================
client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./Comandos/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") {
      console.error(`[Erro ao executar o comando "${command}"]\n`, err);
    }
  }
});

// ========================
//        Evento de Login
// ========================
client.on("ready", () => {
  console.clear();
  console.log(`==========================
Usuários   : ${client.users.size}
Canais     : ${client.channels.size}
Servidores : ${client.guilds.size}
==========================
${client.user.username}
ID: ${client.user.id}
Status: Online
==========================`);

  const statusList = [
    { name: `WORLD$TAR MONEY`, type: "LISTENING" },
    { name: `${client.users.size} Usuários`, type: "WATCHING" },
    { name: `User#0000`, type: "PLAYING" }
  ];

  const setRandomStatus = () => {
    const status = statusList[Math.floor(Math.random() * statusList.length)];
    client.user.setPresence({ game: status });
  };

  setRandomStatus();
  setInterval(setRandomStatus, 10000);
});

// ========================
//           Login
// ========================
client.login(token);
