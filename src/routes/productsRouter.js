// Requires
const express = require('express');
const multer= require('multer');
const path = require('path');

const router = express.Router();

// requires del controlador
const productsController = require('../controllers/productsController');

const productValidation = require("../middlewares/validateProduct");

const adminMiddleware = require("../middlewares/admin");


const storage= multer.diskStorage({
    destination: function (req,file,cb){
        
        cb(null, 'public/img/products')
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }
})

const upload= multer({storage:storage}); //especificarle a multer que deseamos usar la config anterior como disco de almacenamiento de archivos. 


// Devolver todos los productos  
router.get('/', productsController.index);

// Devolver un producto 
router.get('/detail/:id/', productsController.detail); 

// Devolver productos por categoría 
router.get('/category/:id', productsController.category)

// Crear un producto
router.get('/create', /* adminMiddleware, */ productsController.create); 

router.post("/create", /* adminMiddleware, */ upload.single("image"), productValidation, productsController.processCreate); 

// Editar un producto 
router.get('/edit/:id', /* adminMiddleware, */ productsController.edit); 

router.put('/edit/:id', /* adminMiddleware, */ upload.single("image"), productsController.processEdit); 

// Eliminar un producto 
router.delete('/borrar/:id', /* adminMiddleware, */ productsController.borrar);

router.get("/search", productsController.index)
router.post("/search", productsController.search);

module.exports = router;