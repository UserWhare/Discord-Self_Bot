const Discord = require("discord.js-selfbot-v11");
const fs = require("fs");
const path = require("path");
const { config, validateConfig } = require("./src/config");
const { log, error } = require("./src/logger");

validateConfig();

const client = new Discord.Client();
client.commands = new Map();

function loadCommands() {
    const directory = path.join(__dirname, "commands");
    const files = fs.readdirSync(directory).filter((file) => file.endsWith(".js"));

    for (const file of files) {
        const command = require(path.join(directory, file));
        if (!command.name || typeof command.run !== "function") continue;

        client.commands.set(command.name, command);

        for (const alias of command.aliases || []) {
            client.commands.set(alias, command);
        }
    }

    log(`${new Set(client.commands.values()).size} comandos carregados`);
}

client.on("message", async (message) => {
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;

    const ownerId = config.ownerId || client.user.id;
    if (message.author.id !== ownerId) return;

    const args = message.content.slice(config.prefix.length).trim().split(/\s+/);
    const commandName = (args.shift() || "").toLowerCase();
    if (!commandName) return;

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.run({ client, message, args, config });
    } catch (err) {
        error(`Falha no comando ${commandName}`, err);
    }
});

client.on("ready", () => {
    console.clear();

    log(`Conectado como ${client.user.tag || client.user.username}`);
    log(`Servidores: ${client.guilds.size} | Usuários: ${client.users.size}`);

    const statuses = [
        { name: "WORLD$TAR MONEY", type: "LISTENING" },
        { name: `${client.guilds.size} servidores`, type: "WATCHING" },
        { name: "Be Simple", type: "PLAYING" }
    ];

    const updatePresence = () => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setPresence({ game: status }).catch(() => {});
    };

    updatePresence();
    setInterval(updatePresence, 30000);
});

client.on("error", (err) => error("Erro do cliente", err));

process.on("unhandledRejection", (err) => error("Promise rejeitada", err));
process.on("uncaughtException", (err) => error("Erro não tratado", err));

loadCommands();
client.login(config.token);
