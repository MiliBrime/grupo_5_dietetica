const express= require("express");
const router=express.Router();

let homeController=require("../controllers/homeController");

router.get("/", homeController.principal);

router.get("/carrito", homeController.carrito);

module.exports=router;