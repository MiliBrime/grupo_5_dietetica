const {body} = require("express-validator");
const path=require("path");

const validation=[
    body("first_name")
        .notEmpty()
        .withMessage("Ingresa tu nombre").bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body("last_name")
        .notEmpty()
        .withMessage("Ingresa tu apellido").bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body("phone")
        .notEmpty()
        .withMessage("Ingresa tu teléfono").bail()
        .isLength({ min: 9 }).withMessage("El teléfono debe tener por lo menos 9 caracteres"),
    body("email")
        .notEmpty().withMessage("Ingresa tu correo electrónico").bail()
        .isEmail().withMessage("Ingresa un correo electrónico válido"),
    body("password")
        .notEmpty().withMessage("Ingresa una contraseña")
        .isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),

    body ("photo").custom((value, {req})=>{
        if (req.file){
            const file=req.file;
            let acceptedExtensions=[".jpg", ".png", ".gif", ".jpeg"];
            let fileExtension = path.extname(file.originalname); //saco la extension del archivo
            if (!acceptedExtensions.includes(fileExtension))
            { //si no es la extension q queremos
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(" y ")}`);
            }}
        return true //indicamos q la validacion tuvo exito
        }),
]

module.exports = validation;