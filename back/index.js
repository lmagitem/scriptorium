#!/usr/bin/env node

const express = require("express");
const https = require("https");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const pool = require("./sql/db-conf")();

// Setting up port with express js
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

// API endpoints
require("./api/user.api")(
    app,
    require("./sql/queries/generic.queries")(pool, "users")
);

// Other endpoints
app.use(
    "/goldencross",
    express.static(path.join(__dirname, "./public/goldencross"))
);
app.use("/", express.static(path.join(__dirname, "./public/scriptorium")));
app.use("*", express.static(path.join(__dirname, "./public/scriptorium")));

// Create port
http.createServer(app).listen(8080, () => console.log("Server started on port 8080"));

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});