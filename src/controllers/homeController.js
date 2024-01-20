const express=require("express");
const app = express();
const path= require("path");
const fs = require('fs');

app.use(express.static("public"));
app.use(express.static("views"));

//pedimos el archivo de productos
const productsFilePath = path.join(__dirname, '../data/products.json');

let indexController={
    principal: (req, res) =>{
        //guardamos los productos
        const products= JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        const productosDestacados = products.filter(product => {
            return product.ofertaOdestacado == "destacado"
        })
        const productosOfertas = products.filter(product => {
            return product.ofertaOdestacado == "oferta"
        })

    res.render("home",{productosDestacados,productosOfertas});

    },
    carrito: (req,res)=>{
        res.render("carrito");
    }
};

module.exports=indexController;