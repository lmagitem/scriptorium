module.exports = (userQueries) => {
    const express = require("express");
    const router = express.Router();
    const passport = require("passport");
    const querystring = require("querystring");

    router.get(
        "/login",
        passport.authenticate("auth0", {
            scope: "openid email profile",
        }),
        (req, res) => {
            res.redirect("/");
        }
    );

    router.get("/callback", (req, res, next) => {
        passport.authenticate("auth0", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect("/login");
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                saveUser(req.user || {}, userQueries);

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
            returnTo =
                process.env.NODE_ENV === "production" ?
                `${returnTo}/` :
                `${returnTo}:${port}/`;
        }

        const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);

        const searchString = querystring.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            returnTo: returnTo,
        });
        logoutURL.search = searchString;

        res.redirect(logoutURL);
    });

    return router;
};

function saveUser(user, userQueries) {
    const sub = user.user_id;
    let existingUser = null;
    const newUser = {
        sub,
        name: user.displayName,
        email: user._json !== undefined ? user._json.email : "",
        picture: user.picture,
        nickname: user.nickname,
    };

    if (sub != undefined) {
        // Let's see if that user exists in db
        userQueries
            .getBySub(sub)
            .then((q) => {
                if (q.error) throw q.error;
                existingUser =
                    q.results.rows !== undefined && q.results.rows.length > 0 ?
                    q.results.rows[0] :
                    null;

                if (existingUser == null) {
                    // If not, let's add it
                    userQueries
                        .addOne(newUser)
                        .then((q) => {
                            if (q.error) throw q.error;
                            existingUser =
                                q.results.rows !== undefined && q.results.rows.length > 0 ?
                                q.results.rows[0] :
                                null;
                            console.log(
                                `User ${existingUser.name} (${existingUser.sub}) added in database.`
                            );
                        })
                        .catch((e) => {
                            throw e;
                        });
                } else {
                    // If yes, let's check if it needs a refresh
                    if (
                        existingUser.name != newUser.name ||
                        existingUser.email != newUser.email ||
                        existingUser.picture != newUser.picture ||
                        existingUser.nickname != newUser.nickname
                    ) {
                        userQueries
                            .updateOne(newUser)
                            .then((q) => {
                                if (q.error) throw q.error;
                                existingUser =
                                    q.results.rows !== undefined && q.results.rows.length > 0 ?
                                    q.results.rows[0] :
                                    null;
                                console.log(
                                    `User ${existingUser.name} (${existingUser.sub}) updated in database.`
                                );
                            })
                            .catch((e) => {
                                throw e;
                            });
                    } else {
                        console.log(
                            `User ${existingUser.name} (${existingUser.sub}) logged in.`
                        );
                    }
                }
            })
            .catch((e) => {
                throw e;
            });
    }
}