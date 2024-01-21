const express=require("express");
const app = express();
const {validationResult} = require ("express-validator");

app.use(express.static("public"));
app.use(express.static("views"));


let usersController={
    login:(req,res)=>{
        res.render("login");
    },
    processLogin:(req,res)=>{
        const errores= validationResult(req);
        const old= req.body;
        if (!errores.isEmpty()) {
            return res.render("login", { mensajesDeError: errores.mapped(), old});
        } else{
        res.send("procesado");
        }
    },
    register:(req,res)=>{
        res.render("register");
    },
    processRegister:(req,res)=>{
        const errores= validationResult(req);
        const old= req.body;
        if (!errores.isEmpty()) {
            return res.render("register", { mensajesDeError: errores.mapped(), old });
        } else{
        res.send("procesado");
        }
    },

}

module.exports=usersController;