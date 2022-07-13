const { response } = require("express");
const {
	getKey,
	addEntity,
	getEntity,
	getAllEntries,
	deleteEntity,
	updateEntity,
} = require("../database/config");

const { User } = require("../models/user");

const bcryptjs = require("bcryptjs");
const { createJWT } = require("../helpers/createJWT");

const login = async (req, res = response) => {
	const { username, password } = req.body;
	try {
		const user = await getEntity("User", username);
		const userKey = getKey("User", username);
		console.log(userKey);
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res
				.status(400)
				.json({ msg: "Invalid User/Password --incorrect password" });
		}
		const token = await createJWT(userKey);
		return res.json({
			token,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			msg: "Talk to admin",
		});
	}
};

const getUserInfo = async (req, res = response) => {
	const user = req.user;
	return res.status(200).json(user);
};

const signup = async (req, res = response) => {
	const { username, password, type } = req.body;
	try {
		const user = await getEntity("User", username);
		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		}
		const encryptedPassword = bcryptjs.hashSync(password, 10);
		const newUser = new User(username, encryptedPassword, type);
		await addEntity("User", username, newUser);
		console.log("HERE");
		const userKey = getKey("User", username);
		console.log(userKey);
		const token = await createJWT(userKey);
		console.log(token);
		return res.json({
			token,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: `Error in signup: ${err}`,
		});
	}
};

const isBusiness = async (req, res = response) => {
	const user = req.user;
	try {
		const business = await getEntity("Business", user.username);
		if (!business || Object.keys(business).length === 0) {
			throw new Error("User is not a business");
		}
		return res.status(200).json({ ...business });
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			msg: `${err}`,
		});
	}
};

module.exports = {
	login,
	signup,
	getUserInfo,
	isBusiness,
};
