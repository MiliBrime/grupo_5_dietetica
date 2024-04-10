const express=require("express");
const app = express();
const path= require("path");
const fs = require('fs');

app.use(express.static("public"));
app.use(express.static("views"));

//pedimos el archivo de productos
const productsFilePath = path.join(__dirname, '../data/products.json');

const db = require('../../database/models');
const {	Product, Status } = db 


let indexController={
    principal: async (req, res) =>{
        try {
            const productosDestacados = await Product.findAll({
                where: {status_id: 2},
             /*    include: [{
                    model: Status,
                    as: 'status',
                }] */
            });
    
            const productosOfertas = await Product.findAll({
                where: {status_id: 1},
                /* include: [{
                    model: Status,
                    as: 'status',
                }] */
            });
            res.render('home', {productosDestacados, productosOfertas})
        } catch (error) {
            console.error('Error:', error);
			res.status(500).send('Error interno del servidor');
        }

    },
    carrito: async (req,res)=>{
        try { 
            const productosOfertas = await Product.findAll({
                where: {status_id: 1}})
            res.render('carrito', {productosOfertas})
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
    
};

module.exports=indexController;