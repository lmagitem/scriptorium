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

        if (sub != undefined) {
            // Let's see if that user exists in db
            let r = await userQueries.getBySub(sub);

            oldUser = !!r.rows && r.rows.length > 0 ? r.rows[0] : null;

            if (oldUser == null) {
                // If not, let's add it
                r = await userQueries.addOne(newUser);
                oldUser = !!r.rows && r.rows.length > 0 ? r.rows[0] : null;

                if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
                    LOG("INFO",
                        `User ${oldUser.name} (${oldUser.sub}) added in database`
                    );
            } else {
                // If yes, let's check if it needs a refresh
                if (
                    oldUser.name != newUser.name ||
                    oldUser.email != newUser.email ||
                    oldUser.picture != newUser.picture ||
                    oldUser.nickname != newUser.nickname
                ) {
                    r = await userQueries.updateOne(newUser);

                    oldUser = !!r.rows && r.rows.length > 0 ? r.rows[0] : null;

                    if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
                        LOG("INFO",
                            `User ${oldUser.name} (${oldUser.sub}) updated in database`
                        );
                } else {
                    if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
                        LOG("INFO", `User ${oldUser.name} (${oldUser.sub}) logged in`);
                }
            }
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