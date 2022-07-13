const { response } = require("express");
const { Customer } = require("../models/customer");
const {
	getKey,
	addEntity,
	getEntity,
	getAllEntries,
	deleteEntity,
	getWithFilter,
	updateEntity,
} = require("../database/config");

const healthy = (req, res = response) => {
	res.status(200).json({
		msg: `Healthy`,
	});
};

const addCustomer = async (req, res = response) => {
	try {
		const { username } = req.user;
		const { gender, age } = req.body;
		const isUser = await getEntity("User", username);
		if (!isUser) {
			throw new Error("User not found");
		}
		const userKey = getKey("User", username);
		const customer = new Customer(userKey, gender, age);
		await addEntity("Customer", "c" + username, customer);
		res.status(201).json({
			msg: `Customer ${customer.name} added successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error adding customer ${err}`,
		});
	}
};

const getCustomer = async (req, res = response) => {
	try {
		const { username } = req.user;
		const customer = await getEntity("Customer", "c" + username);
		if (!customer) {
			throw new Error("Customer not found");
		}

		res.status(201).json({
			...customer,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting username ${err}`,
		});
	}
};

const getAllCustomers = async (req, res = response) => {
	try {
		const customers = await getAllEntries("Customer");
		res.status(201).json({
			...customers,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting customer ${err}`,
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

module.exports = {
	healthy,
	getCustomer,
	addCustomer,
	getAllCustomers,
};
