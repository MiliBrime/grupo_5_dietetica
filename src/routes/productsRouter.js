// Requires
const express = require('express');
const router = express.Router();

// requires del controlador
const productsController = require('../controllers/productsController');

// Devolver todos los productos  
router.get('/', productsController.index);

// Devolver un producto 
router.get('/detail/:id/', productsController.detail); 

// Crear un producto
router.get('/create', productsController.create); 

router.post('/create', productsController.processCreate); 

/* Quiten el comentario y editen según el enunciado

// Editar un producto 
router.???('/:id/???', productsController.edit); 
router.???('/:id', productsController.update); 

// Eliminar un producto 
router.???('/:id', productsController.destroy);

*/


module.exports = router;