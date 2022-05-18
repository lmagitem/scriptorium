module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const passport = require("passport");
    const querystring = require("querystring");
    const userService = require("../services/user.service")();

    router.get(
        "/login",
        passport.authenticate("auth0", {
            scope: "openid email profile",
        }),
        (_req, res) => {
            res.redirect("/");
        }
    );

    router.get("/callback", (req, res, next) => {
        passport.authenticate("auth0", (err, user, _info) => {
            if (err) return next(err);

            if (!user) return res.redirect("/login");

            req.logIn(user, (e) => {
                if (e) return next(e);

                userService.saveUser(req.user || {});

                const returnTo = req.session.returnTo;
                delete req.session.returnTo;
                res.redirect(returnTo || "/");
            });
        })(req, res, next);
    });

    router.get("/logout", (req, res) => {
        req.logOut();

        let returnTo = req.protocol + "://" + req.hostname;
        const port = req.connection.localPort;

        if (port !== undefined && port !== 80 && port !== 443) {
            returnTo = prod ? `${returnTo}/` : `${returnTo}:${port}/`;
        }

        const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
        logoutURL.search = `client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${returnTo}`;

        res.redirect(logoutURL);
    });

    return router;
};