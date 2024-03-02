async function  userLoggedMiddleware(req,res,next){ 
    res.locals.isLogged = false;
    res.locals.userIsAdmin = false;
    
    let cookieUser = req.cookies.userEmail; //userEmail es el nombre de la cookie
    
    if(req.session.admin){
        res.locals.userIsAdmin = true;
        res.locals.admin = req.session.admin; //lo paso a una variable local
    } 

    if(cookieUser) { 
        req.session.userLogged = cookieUser;
    }
    
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        delete res.locals.userLogged;
        res.locals.userLogged= req.session.userLogged //paso lo q tengo en sesion a una variable local, para poder usar el nombre del usuario en la nav var
    }

    next();
}
    
module.exports = userLoggedMiddleware;


