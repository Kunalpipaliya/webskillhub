const mongoose = require("mongoose")
const marksSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true
    },
    s1: Number,
    s2: Number,
    s3: Number
})
module.exports = mongoose.model("marks", marksSchema)