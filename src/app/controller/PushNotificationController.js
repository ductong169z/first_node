const admin = require("firebase-admin");
const { use } = require("../../routes/auth");

class PushNotificationController {
    sendToDevices(req, res) {
        const serviceAccount = require("../../../uploads/serviceAccountKey.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://hiringcar-56ca7-default-rtdb.asia-southeast1.firebasedatabase.app",
        });
        // This registration token comes from the client FCM SDKs.
        const registrationToken =
            "d7E7I4yENXUvZKouaDf6XS:APA91bF5OmfJpzx8t9360FrEA8y5I5fROxwg0Xr0ePx_RUViIAxxKsueGswC4ZbottAxXuD7gpYbBOtln1IUOklL3Y2ebR68_rDS0SkwPFqDS3Dgtms4A9i0By5wcPe3stHXpfKh4Gnn";

        var payload = {
            notification: {
                title: "This is a Notification",
                body: "This is the body of the notification message.",
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
                res.send(response);
                return new Promise();
            })
            .catch(function(error) {
                //console.log("Error sending message:", error);
                res.send(error);
                return new Promise();
            });
    }
}
module.exports = new PushNotificationController();