const fs = require('fs');
const path = require('path');

const express = require('express');
const app= express();

app.use(express.static("public"));
app.use(express.static("views"));

const productsFilePath = path.join(__dirname, '../data/products.json');

/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

const productsController = {
	// Mostrar todos los productos (donde dice todos los productos)
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render("products", {products});
	},

	// Detalle de un producto
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		//cuando ponemos /detail/4 por ej, nos lleva a ese producto
		const singleProduct= products.find(product =>{
			return product.id == req.params.id;
		});

		if (singleProduct !== undefined){
			res.render("productDetail", {singleProduct});
		}else{
			res.render("products", {products}) //no me aparece la imagen de los productos
		}
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
		// Do the magic
	},
	
	// (post) Create - Método para guardar la info
	store: (req, res) => {
		// Do the magic
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		// Do the magic
	},
	// (post) Update - Método para actualizar la info
	update: (req, res) => {
		// Do the magic
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy : (req, res) => {
		// Do the magic
	}
};



module.exports = productsController;