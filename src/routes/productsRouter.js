// Requires
const express = require('express');
const router = express.Router();
const multer= require('multer');

// requires del controlador
const productsController = require('../controllers/productsController');

// Devolver todos los productos  
router.get('/', productsController.index);

// Devolver un producto 
router.get('/detail/:id/', productsController.detail); 

// Crear un producto
router.get('/create', productsController.create); 

router.post('/create', productsController.processCreate); 

// Editar un producto 
router.get('/edit/:id', productsController.edit); 

router.put('/edit/:id', productsController.processEdit); 


// Eliminar un producto 
router.delete('/borrar/:id', productsController.borrar);



module.exports = router;