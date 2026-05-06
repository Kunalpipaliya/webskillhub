const studentModel = require("../model/student")

exports.viewStudent = async (req, res) => {
    try {
        const data = await studentModel.find().populate("user")
        res.status(200).json({
            status: "Success",
            message: "Data Found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.createStudent = async (req, res) => {
    try {
        const data = req.body
        const student = await studentModel.create(data)
        res.status(201).json({
            status: "Success",
            message: "Student Created Successfully",
            data: student
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id
        const data = await studentModel.findByIdAndDelete(id)
        res.status(200).json({
            status: "Success",
            message: "Student Deleted Successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const update = await studentModel.findByIdAndUpdate(id, data)
        res.status(200).json({
            status: "Success",
            message: "Student Updated Successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}