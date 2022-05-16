module.exports = (app) => {
    const guards = require("../auth/guards")();
    const genericApi = require("./generic.api")(
        require("../sql/queries/user.queries")()
    );

    app.get("/api/users", guards.mustBeAdmin, genericApi.getAll);
    app.get("/api/users/:id", guards.mustBeAdmin, genericApi.getById);
    app.put("/api/users/:id", guards.mustBeAdmin, genericApi.updateById);
    app.delete("/api/users/:id", guards.mustBeAdmin, genericApi.deleteById);
};