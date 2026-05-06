const express=require("express")
const router=express.Router()
const studentController=require("../controller/student")
router.get("/student",studentController.viewStudent)
router.post("/createStudent",studentController.createStudent)
router.delete("/deleteStudent/:id",studentController.deleteStudent)
router.patch("/updateStudent/:id",studentController.updateStudent)
module.exports=router