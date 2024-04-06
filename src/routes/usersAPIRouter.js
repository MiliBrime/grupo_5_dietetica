const express= require("express");
const router=express.Router();
const cors=require("cors");

let apiController = require("../controllers/usersAPIController");

router.use(cors());

router.get("/users", apiController.list);

router.get("/users/:id", apiController.detail);

module.exports=router;
