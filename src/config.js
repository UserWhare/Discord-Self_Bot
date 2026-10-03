require("dotenv").config();

function list(value) {
    return new Set(
        String(value || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
    );
}

function number(value, fallback, min, max) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
}

const config = {
    token: process.env.DISCORD_TOKEN || "",
    ownerId: process.env.OWNER_ID || "",
    prefix: process.env.PREFIX || "!",
    recipientIds: list(process.env.RECIPIENT_IDS),
    broadcastDelayMs: number(process.env.BROADCAST_DELAY_MS, 2000, 1000, 10000),
    maxRecipients: number(process.env.MAX_RECIPIENTS, 20, 1, 25)
};

function validateConfig() {
    if (!config.token) {
        throw new Error("DISCORD_TOKEN não foi configurado no .env.");
    }

    if (config.recipientIds.size > config.maxRecipients) {
        throw new Error(`RECIPIENT_IDS excede o limite configurado de ${config.maxRecipients} usuários.`);
    }
}

module.exports = { config, validateConfig };
