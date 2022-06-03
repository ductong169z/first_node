const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://tonghgaz12:DucTong123@cluster0.w4zpqvu.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connect successfully");
    } catch (error) {
        console.log("error", error);
    }
    // const { MongoClient, ServerApiVersion } = require("mongodb");
    // const uri =
    //     "mongodb+srv://tonghgaz12:DucTong123@@cluster0.w4zpqvu.mongodb.net/?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     serverApi: ServerApiVersion.v1,
    // });
    // client.connect((err) => {
    //     const collection = client.db("test").collection("devices");
    //     // perform actions on the collection object
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("connect successfully");

    //     }
    //     client.close();
    // });
}
module.exports = {
    connect,
};