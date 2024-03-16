const path= require('path');
const fs = require('fs'); // Agregar esta línea para importar el módulo fs

const users = require(path.join(__dirname, "../models/users")); 

async function  userLoggedMiddleware(req,res,next){ 
    res.locals.isLogged = false;
    res.locals.userIsAdmin = false;
    
    let cookieUser = req.cookies.recordame; //recordame es el nombre de la cookie 

    if(req.session.admin){
        res.locals.userIsAdmin = true;
        res.locals.admin = req.session.admin; //lo paso a una variable local para poder cambiar el header
    } 
  
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        delete res.locals.userLogged;
        res.locals.userLogged= req.session.userLogged //lo paso a la variable local
    }

    if (cookieUser) {
        res.locals.isLogged = true;
        res.locals.userLogged = cookieUser;
        
        // Aquí podrías verificar si el usuario de la cookie es un administrador
        // Por ejemplo, si tu lista de administradores se almacena en un archivo admins.json
        // Puedes hacer algo como esto:
        const adminsData = fs.readFileSync('src/data/admins.json');
        const admins = JSON.parse(adminsData).admins;
        
        if (admins.includes(cookieUser.email)) {
            res.locals.userIsAdmin = true;
        }
    }
    next();
}
    
module.exports = userLoggedMiddleware;


