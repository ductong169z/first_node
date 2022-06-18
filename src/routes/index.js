const authRouter = require("./auth");
const apiRouter = require("./api");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-output.json');


function route(app) {
    app.use("/auth", authRouter);
    app.use("/api/", apiRouter);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}
module.exports = route;