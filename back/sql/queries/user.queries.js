module.exports = () => {
    const _ = require("lodash");
    const pool = require("../db-conf")();
    const genericQueries = require("./generic.queries")("users");

    // Get all entities
    const getAll = genericQueries.getAll;

    // Get single entity
    const getById = genericQueries.getById;

    // Get user by user_id
    const getBySub = async(sub) =>
        pool.query(`SELECT * FROM users WHERE sub = $1`, [sub]);

    // Add an entity
    const addOne = async(user) => {
        if (!_.has(user, "sub") ||
            !_.has(user, "nickname") ||
            !_.has(user, "email")
        )
            throw new Error("Invalid user to insert.");

        return pool.query(
            `INSERT INTO users (sub, name, email, picture, nickname) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user.sub, user.name, user.email, user.picture, user.nickname]
        );
    };

    // Update entity
    const updateById = async(req, res) => {
        const id = parseInt(req.params.id);
        const user = req.body;

        return pool.query(
            `UPDATE users SET name = $1, email = $2, picture = $3, nickname = $4 WHERE id = $5 RETURNING *`, [user.name, user.email, user.picture, user.nickname, id]
        );
    };

    // Update entity
    const updateOne = async(user) => {
        return pool.query(
            `UPDATE users SET name = $1, email = $2, picture = $3, nickname = $4 WHERE sub = $5 RETURNING *`, [user.name, user.email, user.picture, user.nickname, user.sub]
        );
    };

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