const express=require("express");
const app = express();
/* const {validationResult} = require ("express-validator");
 */
app.use(express.static("public"));
app.use(express.static("views"));

let usersController={
    login:(req,res)=>{
        res.render("login");
    },
    register:(req,res)=>{
        res.render("register");
    },
    processRegister:(req,res)=>{
            res.send("procesado")
        }
    }

module.exports=usersController;