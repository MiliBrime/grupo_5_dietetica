const path= require('path');
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

    if(cookieUser) { 
        res.locals.isLogged = true; //pero aca falta res.locals.userIsAdmin. el problema es cuando entra un admin, no se cambia el header
        cookieUser = req.session.userLogged;
    }
    next();
}
    
module.exports = userLoggedMiddleware;


