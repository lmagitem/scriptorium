module.exports = (app, queries) => {
    const genericApi = require("./generic.api")(queries);

    app.get("/api/users", genericApi.getAll);
    app.get("/api/users/:id", genericApi.getById);
    app.post("/api/users", genericApi.addOne);
    app.put("/api/users/:id", genericApi.updateById);
    app.delete("/api/users/:id", genericApi.deleteById);
};