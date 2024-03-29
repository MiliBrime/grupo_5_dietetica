const fs = require('fs');
const path = require('path');

const express = require('express');
const app= express();

const {validationResult} = require ('express-validator'); 


const { Op } = require('sequelize');

app.use(express.static("public"));
app.use(express.static("views"));

/* const productsFilePath = path.join(__dirname, '../data/products.json');
 */
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
			const allProducts = await Product.findAll();
			const singleProduct = await Product.findByPk(req.params.id);
			res.render('productDetail', {singleProduct,allProducts})
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Error interno del servidor');
	}
	},

	category: async (req, res) => {
		try {
			const categories = await Category.findByPk(req.params.id, {
				include: [{association: 'products'}]
			}); 
			res.render('productCategory', {categories: [categories]})
		} catch (error) {
			console.error('Error:', error);
			res.status(500).send('Error interno del servidor');
		}
	},

	// Formulario para crear
	create: async (req, res) => {
		try { 
			const statuses = await Status.findAll();
			const categories = await Category.findAll();
			console.log(categories);

			res.render("form-creacion-producto", {statuses, categories})
		} catch (error) {
			console.error('Error:', error);
			res.status(500).send('Error interno del servidor');
		}
	  },
	
	// guardar el producto con la info del usuario, y redirigir a alguna pagina para q el usuario sepa q salio todo ok
	processCreate: async (req, res) => {
		try {

			const statuses = await Status.findAll();
        	const categories = await Category.findAll();
			
			const errores = validationResult(req);
			const old = req.body;

        	if (!errores.isEmpty()) {
				if (req.file) {
					// Elimina la imagen del sistema de archivos
					const imagePath = path.join(__dirname, '../../public/img/products', req.file.filename);
					fs.unlinkSync(imagePath); 
				}
            return res.render('form-creacion-producto', { mensajesDeError: errores.mapped(), categories, statuses, old });
        	}

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
		const brands = await Brand.findAll();

		res.render('form-edit-product', {productEdit, statuses, categories, brands})
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

			const productToUpdate = await Product.findByPk(req.params.id);
			// Eliminar la imagen anterior del sistema de archivos si existe y se subio una nueva imagen
			if (req.file && productToUpdate.img) {
				const previousImagePath = path.join(__dirname, '../../public/img/products', productToUpdate.img);
				fs.unlinkSync(previousImagePath);
			}

			//imagen
			const newImage = req.file ? req.file.filename : productToUpdate.img

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
	},

	search: (req,res)=>{
		let keyword= req.body.keyword
		Product.findAll({
			where: {
				name: {[Op.like]: "%" + keyword + "%"}
			}
		})
		.then(found =>{
			return res.render("search",{found, keyword});
		})
		.catch (error => {
			console.error('Error:', error);
			res.status(500).send('Error interno del servidor');	
		})
	}
};

module.exports = productsController;