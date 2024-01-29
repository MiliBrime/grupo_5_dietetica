const express= require("express");
const router=express.Router();
const path= require("path");
const multer=require("multer");

const registerValidation = require("../middlewares/validateRegister");
const loginValidation = require("../middlewares/validateLogin");
const checkDuplicateEmail = require("../middlewares/checkDuplicateEmail");
const guestMiddleware = require("../middlewares/guest");

let usersController=require("../controllers/usersController");

const storage= multer.diskStorage({
    destination: function (req,file,cb){
        
        cb(null, 'public/img/users')
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname + " - " + Date.now() + path.extname(file.originalname)) 
    }
})

const upload= multer({storage:storage}); //especificarle a multer que deseamos usar la config anterior como disco de almacenamiento de archivos. 


router.get("/login",  loginValidation,guestMiddleware, usersController.login);

router.post("/login", loginValidation, usersController.processLogin);

router.get("/logout", usersController.logout);

router.get("/register", checkDuplicateEmail,guestMiddleware, registerValidation,usersController.register);

router.post("/register", upload.single("image"), checkDuplicateEmail,registerValidation,usersController.processRegister);


module.exports=router;


 