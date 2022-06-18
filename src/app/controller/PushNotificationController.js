const admin = require("firebase-admin");
const { use } = require("../../routes/auth");
const Server = require("../models/Server");
const axios = require('axios').default;

class PushNotificationController {
    async sendToDevices(req, res) {
        let nameServer = req.body.name;
        let listTokenUrl = req.body.url;
        const tokens = await axios.get(listTokenUrl)

        let data = Server.findOne({ name: nameServer }, function(err, server) {
            let fileName = server.configFile;
            let dbUrl = server.dbUrl;
            const serviceAccount = require("../../../uploads/" + fileName);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: dbUrl,
            });

            // This registration token comes from the client FCM SDKs.
            const registrationToken = tokens.data.data


            var payload = {
                notification: {
                    title: req.body.title,
                    body: req.body.msg,
                },
            };

            var options = {
                priority: "high",
                timeToLive: 60 * 60 * 24,
            };
            admin
                .messaging()
                .sendToDevice(registrationToken, payload, options)
                .then(function(response) {
                    res.status(200).json(response)
                    return new Promise();
                })
                .catch(function(error) {
                    // //console.log("Error sending message:", error);
                    // res.status(409).json(error)
                    // return new Promise();
                });
        })

    }
}
module.exports = new PushNotificationController();