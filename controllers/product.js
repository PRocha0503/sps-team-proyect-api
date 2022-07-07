const { response } = require("express");
const { Product } = require("../models/product");
const {
	addEntity,
	getEntity,
	getAllEntries,
	deleteEntity,
	updateEntity,
	getWithFilter,
} = require("../database/config");

const healthy = (req, res = response) => {
	res.status(200).json({
		msg: `Healthy`,
	});
};

const addProduct = async (req, res = response) => {
	try {
		const { name, price, description, image, category, owner } = req.body;
		const product = new Product(
			name,
			price,
			description,
			image,
			category,
			owner
		);
		await addEntity("Product", product.name, product);
		res.status(201).json({
			msg: `Product ${product.name} added successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error adding product ${err}`,
		});
	}
};

const getProduct = async (req, res = response) => {
	try {
		const { name } = req.body;
		const product = await getEntity("Product", name);
		res.status(201).json({
			...product,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting product ${err}`,
		});
	}
};

const getAllProducts = async (req, res = response) => {
	try {
		const products = await getAllEntries("Product");
		res.status(201).json({
			...products,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting products ${err}`,
		});
	}
};

const deleteProduct = async (req, res = response) => {
	//TODO: delete corresponding coupons
	try {
		const { name } = req.params;
		await deleteEntity("Product", name);
		res.status(201).json({
			msg: `Product deleted successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error deleting product ${err}`,
		});
	}
};

const updateProduct = async (req, res = response) => {
	try {
		const { name } = req.params;
		const changes = req.body;
		await updateEntity("Product", name, changes);
		res.status(201).json({
			msg: `Product updated successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error updating product ${err}`,
		});
	}
};

const getOwnerProduct = async (req, res = response) => {
	try {
		const { owner_name } = req.query;
		const owner_products = await getWithFilter("Product", "owner", owner_name);
		res.status(201).json({
			...owner_products,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting product ${err}`,
		});
	}
};

module.exports = {
	healthy,
	addProduct,
	getProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
	getOwnerProduct,
};
