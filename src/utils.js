function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeDelete(message, timeout = 0) {
    if (!message || typeof message.delete !== "function") return;

    const remove = () => message.delete().catch(() => {});
    if (timeout > 0) setTimeout(remove, timeout);
    else remove();
}

function uptime(ms) {
    const total = Math.floor(ms / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

async function resolveRecipients(client, config) {
    const ids = [...config.recipientIds].slice(0, config.maxRecipients);
    const users = [];

    for (const id of ids) {
        let user = client.users.get(id);

        if (!user && typeof client.fetchUser === "function") {
            try {
                user = await client.fetchUser(id);
            } catch {
                user = null;
            }
        }

        if (user && !user.bot) users.push(user);
    }

    return users;
}

module.exports = { delay, safeDelete, uptime, resolveRecipients };
