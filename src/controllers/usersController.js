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
    processLogin: async (req, res) => {
        try{
            let userToLogin = await users.findByField("email", req.body.email);
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
    } catch (error){
        console.log("Error: ", error);
        res.status(500).send('Error interno del servidor');
    }               
    },

    logout:(req,res)=>{
        res.clearCookie("userEmail");
        req.session.destroy ();  //borra todo lo que esté en session
        res.redirect ("/"); 
    },
    
    register:(req,res)=>{
        res.render("register");
    },

    processRegister: async (req,res)=>{
        try{
        const errores= validationResult(req);
        const old= req.body;
        if (!errores.isEmpty()) {
            return res.render("register", { mensajesDeError: errores.mapped(), old });
        } 
        else {
            const newUser = await users.processCreate(req, res);
                req.session.userLogged = newUser;
                return res.redirect("/users/profile") 
            } 
        } catch (error){
                console.log('Error:', error);
                return res.status(500).send('Error interno del servidor');
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