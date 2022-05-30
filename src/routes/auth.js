const express = require("express");
const router = express.Router();
const authController = require("../app/controller/AuthController");

router.post("/register", authController.signup);
router.post("/login", authController.signin);

module.exports = router;