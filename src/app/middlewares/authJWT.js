const jwt = require("jsonwebtoken");
User = require("../models/User");

const verifyToken = (req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        jwt.verify(
            req.headers.authorization.split(" ")[1],
            "Yae Miko",
            function(err, decode) {
                if (err) req.user = undefined;
                User.findOne({
                    _id: decode.id,
                }).exec((err, user) => {
                    if (err) {
                        res.status(500).send({
                            message: err,
                        });
                    } else {
                        req.user = user;
                        next();
                    }
                });
            }
        );
    } else {
        res.status(403).send({
            message: "Invalid JWT token",
        });
    }
};
module.exports = verifyToken;