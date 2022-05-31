const express = require("express");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
const bodyParser = require('body-parser');



db.connect();
app.use(morgan("combined"));
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});