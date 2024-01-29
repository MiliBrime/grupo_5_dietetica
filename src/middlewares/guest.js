function guestMiddleware(req,res,next){
    if (req.session.userLogged) 
    //userLogged se generó cuando hicimos el ingreso del usuario
    {
      return res.redirect("/users/profile")
    }
    next(); //si no tengo a nadie logueado sigue la cadena
    }
  
  module.exports = guestMiddleware;
  