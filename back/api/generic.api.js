module.exports = (queries) => {
    // Get all entities
    const getAll = (req, res) => {
        console.log("Received getAll call.");
        queries
            .getAll(req, res)
            .then((q) => {
                if (q.error) throw q.error;
                console.log("Query results: ", q);
                res.status(200).json(q.results.rows);
            })
            .catch((e) => {
                throw e;
            });
    };

    // Get single entity
    const getById = (req, res) => {
        console.log("Received getById call.");
        queries
            .getById(req, res)
            .then((q) => {
                if (q.error) throw q.error;
                console.log("Query results: ", q);
                res.status(200).json(q.results.rows);
            })
            .catch((e) => {
                throw e;
            });
    };

    // Add entity
    const addOne = (req, res) => {
        console.log("Received addOne call.");
        queries
            .addOne(req, res)
            .then((q) => {
                if (q.error) throw q.error;
                console.log("Query results: ", q);
                res.status(201).send(`Entity added with ID: ${q.results.insertId}`);
            })
            .catch((e) => {
                throw e;
            });
    };

    // Update entity
    const updateById = (req, res) => {
        console.log("Received updateById call.");
        queries
            .updateById(req, res)
            .then((q) => {
                if (q.error) throw q.error;
                console.log("Query results: ", q);
                res.status(200).send(`Entity modified with ID: ${req.params.id}`);
            })
            .catch((e) => {
                throw e;
            });
    };

    // Delete entity
    const deleteById = (req, res) => {
        console.log("Received deleteById call.");
        queries
            .deleteById(req, res)
            .then((q) => {
                if (q.error) throw q.error;
                console.log("Query results: ", q);
                res.status(200).send(`Entity deleted with ID: ${req.params.id}`);
            })
            .catch((e) => {
                throw e;
            });
    };

    return {
        getAll,
        getById,
        addOne,
        updateById,
        deleteById,
    };
};