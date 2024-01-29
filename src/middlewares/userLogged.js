const user= require("../models/users"); 

function userLoggedMiddleware(req,res,next){
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;

    let userFromCookie = user.findByField("email", emailInCookie);

    if(userFromCookie){ //si alguien puso para recordarlo, y hay un usuario en la cookie
        req.session.userLogged = userFromCookie;
    }
    
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged= req.session.userLogged //paso lo q tengo en sesion a una variable local, para poder usar el nombre del usuario en la nav var
    }

    next();}
    
module.exports = userLoggedMiddleware;
  
  