module.exports = (pool, tableName) => {
    // Get all entities
    const getAll = (req, res) =>
        new Promise((resolve, reject) =>
            pool.query(
                `SELECT * FROM ${tableName} ORDER BY id ASC`,
                (error, results) => resolve({ error, results })
            )
        );

    // Get single entity
    const getById = (req, res) =>
        new Promise((resolve, reject) => {
            const id = parseInt(req.params.id);

            pool.query(
                `SELECT * FROM ${tableName} WHERE id = $1`, [id],
                (error, results) => resolve({ error, results })
            );
        });

    // Add an entity
    const addOne = (req, res) =>
        new Promise((resolve, reject) => {
            let keys = "";
            let numbers = "";
            let currentNumber = 1;
            const values = [];

            for (const key in req.body) {
                if (Object.hasOwnProperty.call(req.body, key)) {
                    keys += keys === "" ? key : `, ${key}`;
                    numbers +=
                        numbers === "" ? `$${currentNumber}` : `, $${currentNumber}`;
                    currentNumber++;
                    values.push(req.body[key]);
                }
            }

            pool.query(
                `INSERT INTO ${tableName} (${keys}) VALUES (${numbers}) RETURNING *`,
                values,
                (error, results) => resolve({ error, results })
            );
        });

    // Update entity
    const updateById = (req, res) =>
        new Promise((resolve, reject) => {
            const id = parseInt(req.params.id);

            let keyValues = "";
            let currentNumber = 1;
            const values = [];

            for (const key in req.body) {
                if (Object.hasOwnProperty.call(req.body, key) && key !== "id") {
                    keyValues +=
                        keyValues === "" ?
                        `${key} = $${currentNumber}` :
                        `, ${key} = $${currentNumber}`;
                    currentNumber++;
                    values.push(req.body[key]);
                }
            }

            pool.query(
                `UPDATE ${tableName} SET ${keyValues} WHERE id = $${currentNumber} RETURNING *`, [...values, id],
                (error, results) => resolve({ error, results })
            );
        });

    // Delete entity
    const deleteById = (req, res) =>
        new Promise((resolve, reject) => {
            const id = parseInt(req.params.id);

            pool.query(
                `WITH deleted AS (DELETE FROM ${tableName} WHERE id = $1 RETURNING *) SELECT count(*) FROM deleted`, [id],
                (error, results) => resolve({ error, results })
            );
        });

    return {
        getAll,
        getById,
        addOne,
        updateById,
        deleteById,
    };
};