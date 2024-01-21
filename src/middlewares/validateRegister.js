const {body} = require("express-validator");
const path=require("path");

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

    body ("image").custom((value, {req})=>{
        if (req.file){
            const file=req.file;
            let acceptedExtensions=[".jpg", ".png"];
            let fileExtension = path.extname(file.originalname); //saco la extension del archivo
            if (!acceptedExtensions.includes(fileExtension))
            { //si no es la extension q queremos
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
            }}
        else{
            const defaultImagePath = './img/users/default.jpg'; // Ponemos imagen por defecto
            }
        return true //indicamos q la validacion tuvo exito
        }),
]

module.exports = validation;