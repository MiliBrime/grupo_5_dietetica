const express = require("express");
const {validationResult} = require ("express-validator");
const fs=require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs')
const users= require("../models/users");


let usersController={
    login:(req,res)=>{
        res.render("login");
    },
    processLogin: (req, res) => {
        let userToLogin = users.findByField("email", req.body.email);
        if(userToLogin) {
            let isThePasswordOk = bcryptjs.compareSync (req.body.password, userToLogin.password);
            if (isThePasswordOk) {
                delete userToLogin.password; //por seguridad
                req.session.userLogged = userToLogin;
                if(req.body.rememberUser) {
                    res.cookie("userEmail", req.body.email, {maxAge: 365 * 24 * 60 * 60 * 1000})
                }
                return res.redirect("/users/profile") 
                }
            
            return res.render("login", {
                errors: {
                    password: {
                         msg: 'Los datos ingresados son incorrectos. Vuelva a intentarlo.'
                        }
                    }
                });
            } 
        return res.render("login", {
            errors: {
                email: {
                    msg: 'El correo electrónico ingresado no está registrado. Vuelva a intentarlo.'
                }
            }
        });
                    
    },

    logout:(req,res)=>{
        res.clearCookie("userEmail");
        req.session.destroy ();  //borra todo lo que esté en session
        res.redirect ("/"); 
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
            const newUser = users.findByField("email", req.body.email);
            req.session.userLogged = newUser;
            res.redirect("/users/profile")
            }
    },

    profile:(req,res)=>{
        res.render("profile", {user: req.session.userLogged});
    },

    /* editProfile:(req,res)=>{
            users.edit(req,res);
            res.redirect("/users/profile") 
        }
 */
}

module.exports=usersController;