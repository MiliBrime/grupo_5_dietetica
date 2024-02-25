const fs = require('fs');
const path = require('path');

const express = require('express');
const app= express();

app.use(express.static("public"));
app.use(express.static("views"));

const productsFilePath = path.join(__dirname, '../data/products.json');

const db = require('../../database/models');
const {	Product, Status, Category, Brand } = db 

/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

const productsController = {
	// Mostrar todos los productos (donde dice todos los productos)
	index: async (req, res) => {
		try { 
		const products = await Product.findAll();
		res.render("products", {products});
		
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Error interno del servidor');
	}
	},

	// Detalle de un producto
	detail: async (req, res) => {
		try {
			const singleProduct = await Product.findByPk(req.params.id);
			res.render('productDetail', {singleProduct})
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Error interno del servidor');
	}
	},

	// Formulario para crear
	create: async (req, res) => {
		try { 
			const statuses = await Status.findAll()
			const categories = await Category.findAll()
			res.render("form-creacion-producto", {statuses, categories})
		} catch (error) {
			console.error('Error:', error);
			res.status(500).send('Error interno del servidor');
		}
	  },
	
	// guardar el producto con la info del usuario, y redirigir a alguna pagina para q el usuario sepa q salio todo ok
	processCreate: async (req, res) => {
		try {
			   const brandName = req.body.brand;

			    // Busca si la marca ya existe en la base de datos
				const existingBrand = await Brand.findOne({
					where: { name: brandName }
				});
		
				// Si la marca existe, usa su brand_id
				// Si no existe, crea la marca y obtén su brand_id
				const brand_id = existingBrand ? existingBrand.id : await Brand.create({ name: brandName }).then(newBrand => newBrand.id);
	   	
			const newProduct = await Product.create ({
				name: req.body.name,
				price: req.body.price,
				img: req.file != undefined ? req.file.filename : " ",
				category_id: req.body.category,
				status_id: req.body.ofertaOdestacado,
				description_home: req.body.descriptionHome,
				description: req.body.descriptionProduct,
				brand_id: brand_id
			})
			
			res.redirect('/')
		}
		catch(error) {
			console.error('Error:', error);
			res.status(500).send('Error interno del servidor');
		}
	},

	// Formulario para editar
	edit: async (req, res) => {
		try { 
		const productEdit = await Product.findByPk(req.params.id);
		const statuses = await Status.findAll();
		const categories = await Category.findAll();

		res.render('form-edit-product', {productEdit, statuses, categories})
		} catch (error) {
			console.error('Error:', error);
			res.status(500).send('Error interno del servidor');
		}
	},

	// Actualizar la info
	processEdit: async (req, res) => {
		try { 
			const brandName = req.body.brand;

			const existingBrand = await Brand.findOne({
				where: { name: brandName }
			});
	
			const brand_id = existingBrand ? existingBrand.id : await Brand.create({ name: brandName }).then(newBrand => newBrand.id);

			//imagen
			const newImage = req.file ? req.file.filename : Product.img

			updateProduct = await Product.update({
				name: req.body.name,
				price: req.body.price,
				category_id: req.body.category,
				status_id: req.body.ofertaOdestacado, 
				description_home: req.body.descriptionHome,
				description: req.body.descriptionProduct,
				img: newImage,
				brand_id: brand_id
			}, {
				where: {id: req.params.id}
			}); 
			
			res.redirect('/')

			} catch (error) {
				console.error('Error:', error);
				res.status(500).send('Error interno del servidor');
				}
				},

	// Eliminar un producto de la DB
	borrar: async (req, res) => {
		try { 
		await Product.destroy({
			where: {
				id: req.params.id
			}
		})
		
		res.redirect("/");
		} catch (error) {
			console.error('Error:', error);
			res.status(500).send('Error interno del servidor');	
		}
	}
};

module.exports = productsController;