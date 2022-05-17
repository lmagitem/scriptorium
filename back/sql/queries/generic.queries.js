module.exports = (tableName) => {
    const pool = require("../db-conf")();

    // Get all entities
    const getAll = async(_req, _res) => {
        if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
            LOG("INFO", `Processing getAll(${tableName}) query`);

        return pool.query(`SELECT * FROM ${tableName} ORDER BY id ASC`);
    };

    // Get single entity
    const getById = async(req, _res) => {
        const id = parseInt(req.params.id);

        if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
            LOG("INFO", `Processing getById(${id}, ${tableName}) query`);

        return pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
    };

    // Add an entity
    const addOne = async(req, _res) => {
        if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
            LOG("INFO", `Processing addOne(${tableName}) query`);

        let keys = "";
        let numbers = "";
        let currentNumber = 1;
        const values = [];

        for (const key in req.body) {
            if (Object.hasOwnProperty.query(req.body, key)) {
                keys += keys === "" ? key : `, ${key}`;
                numbers += numbers === "" ? `$${currentNumber}` : `, $${currentNumber}`;
                currentNumber++;
                values.push(req.body[key]);
            }
        }

        return pool.query(
            `INSERT INTO ${tableName} (${keys}) VALUES (${numbers}) RETURNING *`,
            values
        );
    };

    // Update entity
    const updateById = async(req, _res) => {
        const id = parseInt(req.params.id);

        if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
            LOG("INFO", `Processing updateById(${id}, ${tableName}) query`);

        let keyValues = "";
        let currentNumber = 1;
        const values = [];

        for (const key in req.body) {
            if (Object.hasOwnProperty.query(req.body, key) && key !== "id") {
                keyValues +=
                    keyValues === "" ?
                    `${key} = $${currentNumber}` :
                    `, ${key} = $${currentNumber}`;
                currentNumber++;
                values.push(req.body[key]);
            }
        }

        return pool.query(
            `UPDATE ${tableName} SET ${keyValues} WHERE id = $${currentNumber} RETURNING *`, [...values, id]
        );
    };

    // Delete entity
    const deleteById = async(req, _res) => {
        const id = parseInt(req.params.id);

        if (process.env.LOG_LEVEL >= LOG_LEVEL.INFO)
            LOG("INFO", `Processing deleteById(${id}, ${tableName}) query`);

        return pool.query(
            `WITH deleted AS (DELETE FROM ${tableName} WHERE id = $1 RETURNING *) SELECT count(*) FROM deleted`, [id]
        );
    };

    return {
        getAll,
        getById,
        addOne,
        updateById,
        deleteById,
    };
};