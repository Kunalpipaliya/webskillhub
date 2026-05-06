const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("notice", noticeSchema)