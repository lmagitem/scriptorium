const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

// Define global logger
require("./utils/log");

// Setting up port with express js
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

// Session configuration
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 86400000 },
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
    }),
};
if (prod) {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
    // Trust Nginx
    app.set("trust proxy", 1);
}

// Passport configuration
const strategy = new Auth0Strategy({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    (_accessToken, _refreshToken, _extraParams, profile, done) =>
    done(null, profile)
);

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

// API endpoints
require("./api/user.api")(app);

// Other endpoints
app.use(
    "/goldencross",
    express.static(path.join(__dirname, "./public/goldencross"))
);
app.use("/", express.static(path.join(__dirname, "./public/scriptorium")));
app.use("*", express.static(path.join(__dirname, "./public/scriptorium")));

app.get("/", (_req, res) => {
    res.sendFile("./public/scriptorium/index.js");
});

// Find 404 and hand over to error handler
app.use((_req, _res, next) => next(createError(404)));

// error handler
app.use((err, _req, res, _next) => {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

module.exports = app;