const Server = require("../models/Server");
const path = require("path");
class ServerController {
    list(req, res) {
        const queryName = req.query.name;
        Server.find(queryName ? { name: queryName } : {}).then((server) => {
            res.status(200).send({
                server: server,
                message: "Successfull",
            });
        });
    }
    create(req, res) {
        const name = req.body.name;
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: "No file uploaded",
                });
            } else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let configFile = req.files.configFile;
                const fileName = name + Math.random() + configFile.name;
                var uploadPath = path.resolve(
                    __dirname,
                    "../../../uploads/" + fileName
                );
                console.log(uploadPath);
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                configFile.mv(uploadPath, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
                const server = new Server({
                    name: name,
                    configFile: fileName,
                });
                server.save((err, server) => {
                    if (err) {
                        res.status(500).send({
                            message: err,
                        });
                        return;
                    } else {
                        res.status(200).send({
                            message: "Create server successfully",
                            server: server,
                        });
                    }
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    update(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: "No file uploaded",
                });
            } else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let configFile = req.files.configFile;
                const fileName = name + Math.random() + configFile.name;
                var uploadPath = path.resolve(
                    __dirname,
                    "../../../uploads/" + fileName
                );
                console.log(uploadPath);
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                configFile.mv(uploadPath, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
                Server.findOneAndUpdate(
                    id, {
                        name: name,
                        configFile: fileName,
                    }, { new: true },
                    function(err, docs) {
                        if (err) {
                            res.status(500).send({
                                message: err,
                            });
                            return;
                        } else {
                            res.status(200).send({
                                message: "Update server successfully",
                                server: docs,
                            });
                        }
                    }
                );
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
    delete(req, res) {
        const id = req.body.id;
        Server.findByIdAndDelete(id, function(err) {
            if (err) {
                res.status(500).send({
                    message: err,
                });
                return;
            } else {
                res.status(200).send({
                    message: "Delete server successfully",
                });
            }
        });
    }
}
module.exports = new ServerController();