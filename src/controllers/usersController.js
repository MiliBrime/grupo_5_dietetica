const express = require("express");
const {validationResult} = require ("express-validator");
const fs=require("fs");
const path = require("path");

const users= require("../models/users");


let usersController={
    login:(req,res)=>{
        res.render("login");
    },
    processLogin: (req, res) => {
        /* const errores = validationResult(req);
        const old = req.body;
    
        if (!errores.isEmpty()) { //si hay errores
            return res.render("login", { mensajesDeError: errores.mapped(), old });
        } else {
            // Leer los usuarios
            let usersJSON = fs.readFileSync(path.join(__dirname, "../data/users.json"), { encoding: "utf-8" });
            let users;
    
            if (usersJSON === "") {
                users = []; // Creamos el array de usuarios
            } else {
                users = JSON.parse(usersJSON); // Convertimos en un objeto
            }
    
            let usuarioALoguearse;
    
            // Buscamos el usuario por correo electrónico
            const userFound = users.find((user) => user.email === req.body.email);
    
            if (userFound && bcrypt.compareSync(req.body.password, userFound.password)) {
                usuarioALoguearse = userFound;
            }
    
            if (!usuarioALoguearse) {
                // Si no se encontró el usuario o la contraseña no es válida
                return res.render("login", {
                    errores: [{ msg: "Credenciales inválidas" }],
                });
            }
    
            // Si el usuario se autenticó correctamente, lo guardamos en la sesión
            req.session.usuarioLogueado = usuarioALoguearse;
            res.render("success"); // Renderizar la vista de éxito
        } */
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
            users.processCreate(req,res);
            res.send("usuario creado!!!") //redireccionar al perfil
            }
    },

}

module.exports=usersController;