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
    findByField: async function(field, text) {
        if (field && text) { // Verificar si field y text son valores válidos
            return await db.User.findOne({
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
            photo: req.file ? req.file.filename : "default.jpg",
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

    edit: async function(req, res) {
        let userId =  req.session.userLogged.id;
        try {
            await db.User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                photo: req.file ? req.file.filename : req.session.userLogged.photo,
            }, {
                where: {
                    id: userId,
                }
            });

            //actualizar la direccion del usuario
            let address= await db.Address.findOne({
                where:{
                    user_id: userId 
                }
            });
            if (address){
                await address.update({
                    address: req.body.address ? req.body.address : address.address,
                    zip_code: req.body.zip_code ? req.body.zip_code : address.zip_code,
                })
            } else{
                await db.Address.create({
                    address: req.body.address ? req.body.address : '',
                    zip_code: req.body.zip_code ? req.body.zip_code : '',
                    user_id: userId,
                })
            }

            let updatedUser = await db.User.findByPk(userId);
            res.render('profile', { user: updatedUser, address });
            
        } catch (error) {
            console.log(error);
            res.json(error)    
        }
    }
}

module.exports = user;