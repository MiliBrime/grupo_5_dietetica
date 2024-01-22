const path=require("path");
const users = require(path.join(__dirname, "../models/users")); 

const checkDuplicateEmail = (req, res, next) => {
    
    // Verifica si el correo electrónico ya está registrado
    const userInDB = users.findByField("email", req.body.email);

    if (userInDB) {
        res.locals.errorMessage ="Este correo electrónico ya está registrado"
        res.locals.old = req.body; // Establece los datos antiguos en locals.old
        return res.render("register", res.locals);
        };
    // Si no hay duplicados, pasa al siguiente middleware
    next();
};

module.exports = checkDuplicateEmail;