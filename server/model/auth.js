const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profile: String,
    roll: String
})

module.exports = mongoose.model("users", authSchema)