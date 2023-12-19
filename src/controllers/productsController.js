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
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

		//cuando ponemos /detail/4 por ej, nos lleva a ese producto
		const singleProduct = products.find(product =>{
			return product.id == req.params.id;
		});
		//si lo encuentra nos lleva al detalle de ese producto
		if (singleProduct !== undefined){
			res.render("productDetail", {singleProduct});
		}else{
			res.render("products", {products}) //no me aparece la imagen de los productos
		}
	},

	// Formulario para crear
	create: (req, res) => {
		res.render("form-creacion-producto")
	},
	
	// // guardar el producto con la info del usuario, y redirigir a alguna pagina para q el usuario sepa q salio todo ok
	processCreate: (req, res) => {
		//traigo el array
		const products = JSON.parse (fs.readFileSync(productsFilePath, "utf-8"));
		
		//creo el nuevo producto con la info que pedimos en el form
		const newProduct = {
			//-1 porq arranca de 0 un array, y despues +1 porq le sumo 1 al ultimo id que hay
			id: products[products.length - 1].id + 1,
  			name: req.body.name,
  			price: req.body.price,
			image: "logo.jpeg",
 			category: req.body.category,
			descriptionProduct: req.body.descriptionProduct,
			descriptionHome: req.body.descriptionHome,
			ofertaOdestacado: req.body.ofertaOdestacado,
		}

		//metodo push para agregarlo al array
		products.push(newProduct);

		//reescribimos el json, las comillas son para que no quede todo en una sola linea
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		//redirigimos
		res.redirect("/products");

	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		
	},
	// (post) Update - Método para actualizar la info
	update: (req, res) => {
		
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy : (req, res) => {
		
	}
};



module.exports = productsController;