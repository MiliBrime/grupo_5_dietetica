const express= require("express");
const router=express.Router();

let apiController = require("../controllers/usersAPIController");

router.get("/users", apiController.list);

router.get("/users/:id", apiController.detail);

module.exports=router;
