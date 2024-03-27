
function adminMiddleware(req,res,next){
  if (!req.session.admin) //no es admin 
  {
    return res.redirect("/")
  }
  next(); 
  }

module.exports = adminMiddleware;
