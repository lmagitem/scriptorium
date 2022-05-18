const http = require("http");

// Environment variables
global.prod = process.env.args === "prod";
require("dotenv").config({ path: prod ? "./.env" : "./local.env" });

// Create app and expose server
const app = require('./app');
http
    .createServer(app)
    .listen(8080, () => LOG("INFO", "Server started on port 8080"));