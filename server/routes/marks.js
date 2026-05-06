const express=require("express")
const router=express.Router()
const markscontroller=require("../controller/marks")
router.get("/viewResult",markscontroller.viewResult)
router.post("/createResult",markscontroller.createResult)
router.delete("/deleteResult/:id",markscontroller.deleteResult)
router.patch("/updateResult/:id",markscontroller.updateResult)
module.exports=router