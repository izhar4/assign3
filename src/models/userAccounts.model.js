const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
    },
    password: {
        type: String
    },
    statusActivated: {
        type: Boolean,
        default: false
    },
    statusLocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String
    },
    claims: {
        type: Array
    }
});

module.exports = mongoose.model("useraccounts", userSchema);