function stamp() {
    return new Date().toLocaleString("pt-BR");
}

function log(message) {
    console.log(`[${stamp()}] ${message}`);
}

function error(message, err) {
    console.error(`[${stamp()}] ${message}`);
    if (err) console.error(err.stack || err);
}

module.exports = { log, error };
