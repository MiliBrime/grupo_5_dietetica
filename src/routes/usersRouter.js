const express= require("express");
const router=express.Router();
const path= require("path");
const multer=require("multer");

router.use(express.static("public"));

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

router.get("/register",validation, usersController.register);

router.post("/register", validation, upload.single("image"), usersController.processRegister);

module.exports=router;