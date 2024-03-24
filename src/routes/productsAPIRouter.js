const express= require("express");
const router= express.Router();

let apiController = require('../controllers/productsAPIController')

router.get('/products', apiController.list);

router.get('/products/:id', apiController.detail)

module.exports = router;