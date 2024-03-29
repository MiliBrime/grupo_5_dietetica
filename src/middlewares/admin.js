
function adminMiddleware(req,res,next){
  if (!res.locals.userIsAdmin) //no es admin 
  {
    return res.redirect("/")
  }
  next(); 
  }

module.exports = adminMiddleware;
