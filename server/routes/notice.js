const express = require("express")

const router = express.Router()
const noticeController = require("../controller/notice")
router.get("/viewNotice", noticeController.viewNotice)

router.post("/createNotice", noticeController.createNotice)

router.delete("/deleteNotice/:id", noticeController.deleteNotice)

router.patch("/updateNotice/:id", noticeController.updateNotice)

router.get("/downloadNotice/:id", noticeController.downloadNoticePDF)
module.exports = router