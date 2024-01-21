const {body} = require("express-validator");

const validation=[
    body("email")
        .notEmpty().withMessage("Ingresa tu correo electrónico").bail()
        .isEmail().withMessage("Ingresa un correo electrónico válido"),
    body("password")
        .notEmpty().withMessage("Ingresa tu contraseña")
]

module.exports = validation;