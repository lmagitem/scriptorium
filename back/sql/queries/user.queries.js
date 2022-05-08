module.exports = (pool) => {
    const _ = require("lodash");
    const genericQueries = require("./generic.queries")(pool, "users");

    // Get all entities
    const getAll = genericQueries.getAll;

    // Get single entity
    const getById = genericQueries.getById;

    // Get user by user_id
    const getBySub = (sub) =>
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM users WHERE sub = $1`, [sub],
                (error, results) => resolve({ error, results })
            );
        });

    // Add an entity
    const addOne = (user) =>
        new Promise((resolve, reject) => {
            if (!_.has(user, "sub") ||
                !_.has(user, "nickname") ||
                !_.has(user, "email")
            )
                throw new Error("Invalid user to insert.");

            pool.query(
                `INSERT INTO users (sub, name, email, picture, nickname) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user.sub, user.name, user.email, user.picture, user.nickname],
                (error, results) => resolve({ error, results })
            );
        });

    // Update entity
    const updateById = (req, res) =>
        new Promise((resolve, reject) => {
            const id = parseInt(req.params.id);
            const user = req.body;

            pool.query(
                `UPDATE users SET name = $1, email = $2, picture = $3, nickname = $4 WHERE id = $5 RETURNING *`, [user.name, user.email, user.picture, user.nickname, id],
                (error, results) => resolve({ error, results })
            );
        });

    // Update entity
    const updateOne = (user) =>
        new Promise((resolve, reject) => {
            pool.query(
                `UPDATE users SET name = $1, email = $2, picture = $3, nickname = $4 WHERE sub = $5 RETURNING *`, [user.name, user.email, user.picture, user.nickname, user.sub],
                (error, results) => resolve({ error, results })
            );
        });

    // Delete entity
    const deleteById = genericQueries.deleteById;

    return {
        getAll,
        getById,
        getBySub,
        addOne,
        updateById,
        updateOne,
        deleteById,
    };
};