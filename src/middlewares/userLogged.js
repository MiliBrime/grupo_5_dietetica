let userModel= require ("../models/users");

async function  userLoggedMiddleware(req,res,next){ 
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail; //userEmail es el nombre de la cookie
    
    if(emailInCookie) { 
        try{
            let userFromCookie = await userModel.findByField("email", emailInCookie);
            
            if(userFromCookie){
                //si alguien puso para recordarlo, hay un usuario en la cookie, y ese va a ser el user logueado
                req.session.userLogged = userFromCookie;
            }
        } catch(error){
            console.error("error devolviendo usuario de la db: ", error)
        }
    }
    
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged= req.session.userLogged //paso lo q tengo en sesion a una variable local, para poder usar el nombre del usuario en la nav var
    }

    next();}
    
module.exports = userLoggedMiddleware;
  
  