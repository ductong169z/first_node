const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/authJWT");
const serverController = require("../app/controller/ServerController");
const pushNotificationController = require("../app/controller/PushNotificationController");

router.get('/server', verifyToken, serverController.index);
router.post('/send-to-devices', verifyToken, pushNotificationController.sendToDevices);

module.exports = router;