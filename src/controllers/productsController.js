const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	// (get) Root - Mostrar todos los productos
	index: (req, res) => {
		// Do the magic
	},

	// (get) Detail - Detalle de un producto
	detail: (req, res) => {
		// Do the magic
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



module.exports = controller;