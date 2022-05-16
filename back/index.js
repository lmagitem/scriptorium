const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");

const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

// Setting up port with express js
const app = express();
const isProd = app.get("env") === "production";
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

require("dotenv").config({ path: isProd ? "./.env" : "./local.env" });

// Session configuration
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
};
if (isProd) {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
}

// Passport configuration
const strategy = new Auth0Strategy({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    (accessToken, refreshToken, extraParams, profile, done) => done(null, profile)
);

// API endpoints
require("./api/user.api")(app);

// Initialize session
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Store and retrieve user data from session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Authentication
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});
app.use("/", require("./auth/auth")());

const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
};
const mustBeAdmin = (req, res, next) => {
    // TODO
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
};

// Other endpoints
app.use(
    "/goldencross",
    express.static(path.join(__dirname, "./public/goldencross"))
);
app.use("/", express.static(path.join(__dirname, "./public/scriptorium")));
app.use("*", express.static(path.join(__dirname, "./public/scriptorium")));

app.get("/", function(req, res) {
    res.sendFile("./public/scriptorium/index.js");
});


// Expose server
http
    .createServer(app)
    .listen(8080, () => console.log("Server started on port 8080"));


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