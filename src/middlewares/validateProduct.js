const {body} = require('express-validator');
const path = require('path');

const validation= [
    body('name')
        .notEmpty()
        .withMessage('Ingresa el nombre del producto'),
    body('brand')
        .notEmpty()
        .withMessage('Ingrea el nombre de la marca'),
    body('price')
        .notEmpty()
        .withMessage('Ingresa un precio').bail()
        .isNumeric()
        .withMessage('Ingresa un precio válido'),
    body('category')
        .notEmpty()
        .withMessage('Ingresa una categoría'),
    body('ofertaOdestacado')
        .notEmpty()
        .withMessage('Ingresa el estado del producto'),
    body('descriptionHome')
        .notEmpty()
        .withMessage('Ingresa una descripción para el home'),
    body('descriptionProduct')
        .notEmpty()
        .withMessage('Ingresa la descripción del producto')
        .isLength({min: 15}).withMessage('La descripción debe tener al menos 15 caracteres.'),

    body('image').custom((value, {req}) => {
        if (!req.file) {
            throw new Error('Debe cargar una imagen');
        }
        if(req.file) {
            const file = req.file;
            let acceptedExtensions = ['.jpg', '.png'];
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son .jpg y .png')
            }
        }
        return true
    })
]

module.exports = validation;