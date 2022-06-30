const { response } = require("express");
const voucher_codes = require("voucher-code-generator");
const { Order } = require("../models/order");
const {
	getKey,
	addEntity,
	getEntity,
	getAllEntries,
	deleteEntity,
	updateEntity,
} = require("../database/config");

const healthy = (req, res = response) => {
	res.status(200).json({
		msg: `Healthy`,
	});
};

const addOrder = async (req, res = response) => {
	try {
		const { username, productName, code } = req.body;
		const isProduct = await getEntity("Product", productName);
		const isUser = await getEntity("User", username);
		const coupon = await getEntity("Coupon", code);
		if (!isProduct) {
			throw new Error("Product not found");
		}
		if (!isUser) {
			throw new Error("User not found");
		}
		const productKey = getKey("Product", productName);
		const userKey = getKey("User", username);
		let price;
		if (coupon && coupon.item.name == isProduct.name) {
			price = isProduct.price * (1 - coupon.percentage / 100);
		} else {
			price = isProduct.price;
		}
		const date = new Date();
		const order = new Order(userKey, productKey, date, price, false);
		await addEntity("Order", productKey.name + date.toString(), order);
		res.status(201).json({
			msg: `Order for ${order.product.name} added successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error adding order ${err}`,
		});
	}
};

//TODO get order
// const getCoupon = async (req, res = response) => {
// 	try {
// 		const { code } = req.body;
// 		const coupon = await getEntity("Coupon", code);
// 		res.status(201).json({
// 			...coupon,
// 		});
// 	} catch (err) {
// 		res.status(401).json({
// 			msg: `Error getting coupon ${err}`,
// 		});
// 	}
// };

const getAllOrders = async (req, res = response) => {
	try {
		const orders = await getAllEntries("Order");
		res.status(201).json({
			...orders,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting orders ${err}`,
		});
	}
};
//TODO delete order
// const deleteCoupon = async (req, res = response) => {
// 	try {
// 		const { code } = req.params;
// 		await deleteEntity("Coupon", code);
// 		res.status(201).json({
// 			msg: `Coupon deleted successfully`,
// 		});
// 	} catch (err) {
// 		res.status(401).json({
// 			msg: `Error deleting coupon ${err}`,
// 		});
// 	}
// };

const updateOrder = async (req, res = response) => {
	try {
		const { productName, date, ...changes } = req.body;
		const isProduct = await getEntity("Product", productName);
		if (!isProduct) {
			throw new Error("Product not found");
		}
		const productKey = getKey("Product", productName);
		await updateEntity(
			"Coupon",
			productKey.name + new Date(date).toString(),
			changes
		);
		res.status(201).json({
			msg: `Order updated successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error updating order ${err}`,
		});
	}
};

module.exports = {
	healthy,
	addOrder,
	getAllOrders,
	updateOrder,
};
