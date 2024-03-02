authMiddleware.js

function authMiddleware(req,res,next){
  if ((!req.session.userLogged) && (!req.session.admin)) //no tengo a nadie en sesion
  {
    return res.redirect("/users/login")
  }
  next(); 
  }

module.exports = authMiddleware;

