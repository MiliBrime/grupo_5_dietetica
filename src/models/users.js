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

        const userToUpdate = await db.User.findByPk(userId);
        // Eliminar la imagen anterior del sistema de archivos si existe y se subio una nueva imagen
        if (req.file && userToUpdate.photo && userToUpdate.photo != "default.jpg") {
            const previousImagePath = path.join(__dirname, "../../public/img/users", userToUpdate.photo);
            if (fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            } else {
                console.warn("El archivo a eliminar no existe:", previousImagePath);
            }
        }
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
            req.session.userLogged = updatedUser.dataValues;
            res.render('profile', { user: updatedUser, address });
            
        } catch (error) {
            console.log(error);
            res.json(error)    
        }
    },

    updateFromAdmin:async function(req, res) {
        try {
        let userId =  req.params.id;
        const userToUpdate = await db.User.findByPk(userId);

        // Eliminar la imagen anterior del sistema de archivos si existe y se subio una nueva imagen
        if (req.file && userToUpdate.photo && userToUpdate.photo != "default.jpg") {
            const previousImagePath = path.join(__dirname, "../../public/img/users", userToUpdate.photo);
            if (fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            } else {
                console.warn("El archivo a eliminar no existe:", previousImagePath);
            }
        }
            await db.User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                photo: req.file && req.file.filename ? req.file.filename : userToUpdate.photo
            }, {
                where: {
                    id: req.params.id,
                }
            });
            
            //actualizar la direccion del usuario
            let address= await db.Address.findOne({
                where:{
                    user_id: userId 
                }
            });

            if (address) {
                await address.update({
                    address: (req.body.address && req.body.address.trim() !== "") ? req.body.address : (address.address ? address.address : "Sin dirección"),
                    zip_code: (req.body.zip_code && req.body.zip_code.trim() !== "") ? req.body.zip_code : (address.zip_code ? address.zip_code : "Sin CP"),
                });
            } else {
                await db.Address.create({
                    address: (req.body.address && req.body.address.trim() !== "") ? req.body.address : "Sin dirección",
                    zip_code: (req.body.zip_code && req.body.zip_code.trim() !== "") ? req.body.zip_code : "Sin CP",
                    user_id: userId,
                });
            }

            let updatedUser = await db.User.findByPk(userId);
            console.log(updatedUser.dataValues);
            
            /* res.render('usersEdit', { user: updatedUser, address }); */
            res.redirect("/users/list")

        } catch (error) {
            console.log(error);   
        }
    },
}

module.exports = user;