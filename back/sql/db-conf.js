module.exports = function() {
    const Pool = require("pg").Pool;
    let dbConf = require("./local-secrets.js");

    if (dbConf == undefined) {
        dbConf = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        };
    }

    return new Pool(dbConf);
};