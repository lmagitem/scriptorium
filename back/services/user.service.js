module.exports = () => {
    const userQueries = require("../sql/queries/user.queries")();

    // With user details received from Auth0, creates or updates a user
    const saveUser = async(user) => {
        const sub = user.user_id;
        let oldUser = null;
        const newUser = {
            sub,
            name: user.displayName,
            email: user._json !== undefined ? user._json.email : "",
            picture: user.picture,
            nickname: user.nickname,
        };

        if (sub == undefined) return;

        let r = await userQueries.getBySub(sub);
        oldUser = getRowsContent(r);

        // If the user doesn't exist in db, let's add it
        if (oldUser == null) {
            r = await userQueries.addOne(newUser);
            oldUser = getRowsContent(r);

            if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
                LOG("INFO", `User ${oldUser.name} (${oldUser.sub}) added`);
            return;
        }

        // If it exist, let's check if it needs a refresh
        if (oldUser.email != newUser.email || oldUser.picture != newUser.picture) {
            r = await userQueries.updateOne(newUser);
            oldUser = getRowsContent(r);

            if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
                LOG("INFO", `User ${oldUser.name} (${oldUser.sub}) updated`);
            return;
        }

        if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
            LOG("INFO", `User ${oldUser.name} (${oldUser.sub}) logged in`);

        function getRowsContent(rslt) {
            return !!rslt.rows && rslt.rows.length > 0 ? rslt.rows[0] : null;
        }
    };

    // Simply checks if a given user has admin rights
    const isAdmin = async(user) => {
        const sub = !!user ? user.user_id : null;
        if (sub == null) return false;

        const r = await userQueries.isAdminBySub(sub);
        const firstRow = !!r.rows && r.rows.length > 0 ? r.rows[0] : null;
        return !!firstRow.admin;
    };

    return {
        saveUser,
        isAdmin,
    };
};