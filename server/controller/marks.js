const marksModel = require("../model/marks")

exports.viewResult = async (req, res) => {
    try {
        // const data = await marksModel.find()
        //     .populate({
        //         path: "student",
        //         select: "studentname enrollmentDate",
        //         populate: {
        //             path: "user",
        //             select: "username email"
        //         }
        //     })
        const data = await marksModel.aggregate([
            {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "studentInfo"
                }

            },
            {
                $unwind: '$studentInfo'
            },
            {
                $addFields: {
                    Sum: {
                        $sum: ['$s1', '$s2', '$s3']
                    },
                    Min: {
                        $min: ['$s1', '$s2', '$s3']
                    },
                    Max: {
                        $max: ['$s1', '$s2', '$s3']
                    }
                }
            }
        ])
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

exports.createResult = async (req, res) => {
    try {
        const data = req.body
        const result = await marksModel.create(data)
        res.status(201).json({
            status: "Success",
            message: "Result Created Successfully",
            data: result
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.deleteResult = async (req, res) => {
    try {
        const id = req.params.id
        const data = await marksModel.findByIdAndDelete(id)
        res.status(200).json({
            status: "Success",
            message: "Result Deleted Successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.updateResult = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const update = await marksModel.findByIdAndUpdate(id, data)
        res.status(200).json({
            status: "Success",
            message: "Result Updated Successfully",
            data: update
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}