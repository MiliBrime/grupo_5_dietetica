// Requires
const express = require('express');
const multer= require('multer');
const path = require('path');

const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

// requires del controlador
const productsController = require('../controllers/productsController');

const storage= multer.diskStorage({
    destination: function (req,file,cb){
        
        cb(null, 'public/img/products')
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname + " - " + Date.now() + path.extname(file.originalname)) 
    }
})

const upload= multer({storage:storage}); //especificarle a multer que deseamos usar la config anterior como disco de almacenamiento de archivos. 


// Devolver todos los productos  
router.get('/', productsController.index);

// Devolver un producto 
router.get('/detail/:id/', productsController.detail); 

// Crear un producto
router.get('/create', productsController.create); 

router.post("/create", upload.single("image"), productsController.processCreate); 

// Editar un producto 
router.get('/edit/:id', productsController.edit); 

router.put('/edit/:id',  upload.single("image"), productsController.processEdit); 

// Eliminar un producto 
router.delete('/borrar/:id', productsController.borrar);


module.exports = router;