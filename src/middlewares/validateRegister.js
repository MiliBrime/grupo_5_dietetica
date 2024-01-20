const {body} = require("express-validator");

const validation=[
    body("name")
        .notEmpty()
        .withMessage("Ingresa tu nombre"),
    body("lastName")
        .notEmpty()
        .withMessage("Ingresa tu apellido"),
    body("email")
        .notEmpty().withMessage("Ingresa tu correo electrónico").bail()
        .isEmail().withMessage("Ingresa un correo electrónico válido"),
    body("password")
        .notEmpty().withMessage("Ingresa una contraseña"),
]

module.exports = validation;