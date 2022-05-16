module.exports = (queries) => {
    // Get all entities
    const getAll = async(req, res) => {
        const q = await queries.getAll(req, res);
        res.status(200).json(q.rows);
    };

    // Get single entity
    const getById = async(req, res) => {
        const q = await queries.getById(req, res);
        const entity = !!q.rows && q.rows.length > 0 ? q.rows[0] : null;
        res.status(200).json(entity);
    };

    // Add entity
    const addOne = async(req, res) => {
        const q = await queries.addOne(req, res);
        const entity = !!q.rows && q.rows.length > 0 ? q.rows[0] : null;
        res.status(201).json(entity);
    };

    // Update entity
    const updateById = async(req, res) => {
        const q = await queries.updateById(req, res);
        const entity = !!q.rows && q.rows.length > 0 ? q.rows[0] : null;
        res.status(200).json(entity);
    };

    // Delete entity
    const deleteById = async(req, res) => {
        const q = await queries.deleteById(req, res);
        const deleted = !!q.rows && q.rows.length > 0 ? !!q.rows[0].count : false;
        res.status(200).send(deleted);
    };

    return {
        getAll,
        getById,
        addOne,
        updateById,
        deleteById,
    };
};