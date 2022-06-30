const { response } = require("express");
const voucher_codes = require("voucher-code-generator");
const { Coupon } = require("../models/coupon");
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

const addCoupon = async (req, res = response) => {
	try {
		const { item, percentage } = req.body;
		const product = await getEntity("Product", item);
		if (!product) {
			throw new Error("Product not found");
		}
		const productKey = getKey("Product", item);
		const [code] = voucher_codes.generate({
			length: 8,
			count: 1,
		});
		const coupon = new Coupon(code, productKey, percentage);
		await addEntity("Coupon", coupon.code, coupon);
		res.status(201).json({
			msg: `Coupon for ${coupon.item} added successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error adding coupon ${err}`,
		});
	}
};

const getCoupon = async (req, res = response) => {
	try {
		const { code } = req.body;
		const coupon = await getEntity("Coupon", code);
		res.status(201).json({
			...coupon,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting coupon ${err}`,
		});
	}
};

const getAllCoupons = async (req, res = response) => {
	try {
		const coupons = await getAllEntries("Coupon");
		res.status(201).json({
			...coupons,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting coupons ${err}`,
		});
	}
};

const deleteCoupon = async (req, res = response) => {
	try {
		const { code } = req.params;
		await deleteEntity("Coupon", code);
		res.status(201).json({
			msg: `Coupon deleted successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error deleting coupon ${err}`,
		});
	}
};

const updateCoupon = async (req, res = response) => {
	try {
		const { code } = req.params;
		const changes = req.body;
		await updateEntity("Coupon", code, changes);
		res.status(201).json({
			msg: `Coupon updated successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error updating coupon ${err}`,
		});
	}
};

module.exports = {
	healthy,
	addCoupon,
	getAllCoupons,
	getCoupon,
	deleteCoupon,
	updateCoupon,
};
