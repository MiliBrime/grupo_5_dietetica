const path=require("path");
const users = require(path.join(__dirname, "../models/users")); 

const checkDuplicateEmail = (req, res, next) => {
    
    // Verifica si el correo electrónico ya está registrado
    const userInDB = users.findByField("email", req.body.email);

    if (userInDB) {
        res.locals.errorMessage ="Este correo electrónico ya está registrado"
        return res.render("register", {oldData:req.body})
        };
    // Si no hay duplicados, pasa al siguiente middleware
    next();
};

module.exports = checkDuplicateEmail;