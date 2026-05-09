const express=require("express")
const router=express.Router()
var multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix+"."+extension)
    }
})

const upload = multer({ storage: storage })
const authController=require("../controller/auth")

router.get("/", authController.viewUsers)

// Create user (Already has multer)
router.post("/createUser", upload.single('profile'), authController.createUser)

router.delete("/deleteUser/:id", authController.deleteUser)

// --- CHANGE THIS LINE ---
// Add upload.single('profile') here so Multer handles the incoming file
router.patch("/updateUser/:id", upload.single('profile'), authController.updateUser)

router.post("/login", authController.loginUser)

module.exports=router