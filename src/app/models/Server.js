const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
const serverSchema = new Schema({
    name: {
        type: String,
        unique: [true, "email already exists in database!"],
        required: [true, "name not provided "],
    },
    configFile: {
        type: String,
        required: [true, "file not provided "],
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Server', serverSchema);