const express= require("express");
const router=express.Router();
const path= require("path");
const multer=require("multer");

const registerValidation = require("../middlewares/validateRegister");
const loginValidation = require("../middlewares/validateLogin");
const profileValidation = require("../middlewares/validateProfile");

const checkDuplicateEmail = require("../middlewares/checkDuplicateEmail");
const guestMiddleware = require("../middlewares/guest");
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

let usersController=require("../controllers/usersController");

const storage= multer.diskStorage({
    destination: function (req,file,cb){
        
        cb(null, 'public/img/users')
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }
})

const upload= multer({storage:storage}); //especificarle a multer que deseamos usar la config anterior como disco de almacenamiento de archivos. 


router.get("/login",  loginValidation, guestMiddleware, usersController.login);

router.post("/login", loginValidation, usersController.processLogin);

router.get("/logout", usersController.logout);

router.get("/register", checkDuplicateEmail,guestMiddleware, registerValidation,usersController.register);

router.post("/register", upload.single("photo"), checkDuplicateEmail,registerValidation,usersController.processRegister);

router.get("/profile",profileValidation, authMiddleware, usersController.profile)

router.post("/profile", profileValidation, upload.single("photo"), authMiddleware, usersController.editProfile)

router.get("/list", /* adminMiddleware, */ usersController.list);

router.get("/edit/:id", /* adminMiddleware, */ usersController.editFromAdmin);
router.put("/edit/:id", /* adminMiddleware, */ upload.single("photo"), usersController.updateFromAdmin);

router.delete("/delete/:id", usersController.delete);

module.exports=router;


 