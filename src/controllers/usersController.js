const express = require("express");
const {validationResult} = require ("express-validator");
const fs=require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs')
const users= require("../models/users");
const user = require("../models/users");
const db = require("../../database/models");

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
                    /* if(userToLogin.email == "milibrime@hotmail.com"){
                        req.session.admin= userToLogin.dataValues
                        console.log("es admin")
                    } else { */
                    req.session.userLogged = userToLogin //.dataValues ? };
                    
                    if(req.body.rememberUser == "recordame") {
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

    profile: async (req,res)=>{
        let user= req.session.userLogged;
        let address= await db.Address.findOne({
            where: {
                user_id: user.id
            }
        })
        res.render("profile", {user, address});
    },

    editProfile: async (req, res) => {
        try {
            await users.edit(req, res);
/*             res.redirect("/users/profile");
 */        } catch (error) {
            res.status(500).send("Error al editar el perfil");
        }
    }

}


module.exports=usersController;