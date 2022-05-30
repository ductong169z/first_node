const authRouter = require("./auth");
const apiRouter = require("./api");

function route(app) {
    app.use("/auth", authRouter);
    app.use("/api/", apiRouter);
}
module.exports = route;