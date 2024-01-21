const path=require("path");
const fs=require("fs");
const bcryptjs = require("bcryptjs");

const user={
    //guardo el json el fileName
    jsonUsers: path.join(__dirname, '../data/users.json'),

    //leer el json, el parse es para q se haga un objeto
    getData: function (){ 
        return JSON.parse(fs.readFileSync(this.jsonUsers, 'utf8'));
    },

    //encontrar a todos los usuarios
    findAll: function(){ 
        return this.getData();
    },

    //encontrar por primary key
    findByPk: function(id){
        //obtenemos todos los usuarios
        let allUsers= this.findAll();
        //buscamos entre ellos el q coincida con el id pasado
        let userFound= allUsers.find(oneUser => oneUser.id==id);
        return userFound;
    },
    //encontrar por cualquier campo. muestra al primero q encuentre
    findByField: function(field,text){
        //obtenemos todos los usuarios
        let allUsers= this.findAll();
        //buscamos entre ellos el q coincida con el texto pasado
        let userFound= allUsers.find(oneUser => oneUser[field]==text);
        return userFound;
    },
    //guardar un usuario
    processCreate: function(req,res){
        let allUsers= this.findAll();
        //creo el nuevo user con la info q pedimos en el form
        const userData = {
            id: allUsers.length > 0 ? allUsers[allUsers.length - 1].id + 1 : 1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file ? req.file.filename : "default.jpg",
        }
        //agrego al JSON
        allUsers.push(userData);
        //sobreeescribo el JSON
        fs.writeFileSync(this.jsonUsers, JSON.stringify(allUsers, null, " "));
    },
    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !==id);
        fs.writeFileSync(this.jsonUsers, JSON.stringify(finalUsers, null, " "));
        return finalUsers;
    }, 
}

module.exports = user;


