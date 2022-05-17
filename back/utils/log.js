// Log level enum
global.LOG_LEVEL = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 2,
};

// Define app log level if not present
process.env.LOG_LEVEL =
    process.env.LOG_LEVEL == null ?
    prod ?
    LOG_LEVEL.WARN :
    LOG_LEVEL.INFO :
    process.env.LOG_LEVEL;

// The function that will be used to log everything
global.LOG = (lvl, msg) =>
    console.log(`[${new Date().toLocaleString("fr-fr")}] - ${lvl}: ${msg}`);