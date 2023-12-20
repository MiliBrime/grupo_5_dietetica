const express= require("express");
const router=express.Router();

let homeController=require("../controllers/homeController");

router.get("/", homeController.principal);

router.get("/carrito", homeController.carrito);

router.get("/login", homeController.login);

router.get("/register", homeController.register);

router.get("/loginsignup", homeController.loginsignup);


module.exports=router;