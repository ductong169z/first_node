const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/authJWT");
const serverController = require("../app/controller/ServerController");
const pushNotificationController = require("../app/controller/PushNotificationController");

router.post('/send-to-devices', verifyToken, pushNotificationController.sendToDevices);
router.get('/server/list', verifyToken, serverController.list);
router.post('/server/create', verifyToken, serverController.create);
router.get('/server/get/:id', verifyToken, serverController.get);
router.post('/server/update', verifyToken, serverController.update);
router.post('/server/delete', verifyToken, serverController.delete);
router.post('/notifiction/send-to-devices', verifyToken, pushNotificationController.sendToDevices);

module.exports = router;