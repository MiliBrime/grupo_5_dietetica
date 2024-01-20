const express= require("express");
const router=express.Router();
const path= require("path");
const multer=require("multer");

const registerValidation = require("../middlewares/validateRegister");

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


router.get("/login", usersController.login);

router.get("/register", registerValidation, usersController.register);

router.post("/register", upload.single("image"),registerValidation, usersController.processRegister);

module.exports=router;