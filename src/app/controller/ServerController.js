class ServerController {
    index(req, res) {
        res.send("1")
    }
}
module.exports = new ServerController();