module.exports = () => {
    const userService = require("../services/user.service")();

    // Middleware to use in order to block non-logged-in connections
    const mustBeLoggedIn = (req, res, next) => {
        if (req.user) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect("/login");
    };

    // Middleware to use in order to restrict to admins only
    const mustBeAdmin = async(req, res, next) => {
        const isAdmin = await userService.isAdmin(req.user);
        if (!isAdmin)
            return res
                .status(403)
                .send({ error: { status: 403, message: "Access denied." } });
        next();
    };

    return { mustBeLoggedIn, mustBeAdmin };
};