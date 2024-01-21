const express= require("express");
const router=express.Router();
const path= require("path");
const multer=require("multer");

const registerValidation = require("../middlewares/validateRegister");
const loginValidation = require("../middlewares/validateLogin");
const checkDuplicateEmail = require("../middlewares/checkDuplicateEmail");

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


router.get("/login",  loginValidation, usersController.login);

router.post("/login", loginValidation, usersController.processLogin);

router.get("/register", checkDuplicateEmail,registerValidation,usersController.register);

router.post("/register", upload.single("image"), checkDuplicateEmail,registerValidation,usersController.processRegister);

/* router.get ("/check", function(req,res){
	if (req.session.usuarioLogueado == undefined){
		res.send ("no estas logueado"); }
	else { res.send ("el usuario logueado es" + req.session.usuarioLogueado.email)}}) */


module.exports=router;