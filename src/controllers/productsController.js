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
			res.redirect("/products");
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

	// Formulario para editar
	edit: (req, res) => {

		//traigo el json
		let products = JSON.parse (fs.readFileSync(productsFilePath, "utf-8"));

		//busco el prod segun id
		const productEdit = products.find(product => {
			return product.id == req.params.id
		})

		res.render("form-edit-product", {productEdit});
	},

	// Actualizar la info
	processEdit: (req, res) => {

		//traemos el json
		const products = JSON.parse (fs.readFileSync(productsFilePath, "utf-8"));

		//buscamos el producto por id que queremos editar
		const id= req.params.id;

		let productEdit= products.find(product => product.id == id);

		//creamos el objeto literal q reemplaza al anterior
		productEdit = {
			id: productEdit.id,
  			name: req.body.name,
  			price:req.body.price,
 			category: req.body.category,
			descriptionProduct: req.body.descriptionProduct,
			descriptionHome: req.body.descriptionHome,
			ofertaOdestacado: req.body.ofertaOdestacado,
		}
		//buscamos la posicion del producto a reemplazar
		let indice = products.findIndex(product =>{
			return product.id == id
		})
		//Lo reemplazamos
		products[indice]=productEdit;

		//edito el json para q se guarde
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		res.redirect("/products");
	},

	// Eliminar un producto de la DB
	borrar : (req, res) => {
		let products = JSON.parse (fs.readFileSync(productsFilePath, "utf-8"));
		//hacemos un nuevo array de products donde queden todos los productos que sean distintos al del params
		products= products.filter(product =>{
			return product.id != req.params.id
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		
		res.redirect("/products");
	}
};



module.exports = productsController;