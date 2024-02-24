const path=require("path");
const fs=require("fs");
const bcryptjs = require("bcryptjs");

let db= require ("../../database/models");

const user={

    //encontrar a todos los usuarios
    findAll: async function (){ 
        return await db.User.findAll();
    },

    //encontrar por primary key
    findByPk: async function(id){
        return await db.User.findByPk(id);
    },
    //encontrar por cualquier campo. muestra al primero q encuentre
    findByField: function(field, text) {
        if (field && text) { // Verificar si field y text son valores válidos
            return db.User.findOne({
                where: {
                    [field]: text
                }
            });
        } 
    },

    //guardar un usuario
    processCreate: function(req,res){
        return db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file ? req.file.filename : "default.jpg",
        })
        .then(newUser => {
            return newUser;
        }) 
    },

    delete: function(req,res){
        db.User.destroy({
            where: {id: req.params.id},
        })
        res.redirect("/")
    }, 
}

module.exports = user;