const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    studentname: String,
    enrollmentDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model("students", studentSchema)