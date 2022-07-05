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
	const user = await getEntity("User", username);
	try {
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res
				.status(400)
				.json({ msg: "Invalid User/Password --incorrect password" });
		}
		const token = await createJWT(username);
		res.json({
			user,
			token,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			msg: "Talk to admin",
		});
	}
};

const signup = async (req, res = response) => {
	const { username, password, type } = req.body;
	const user = await getEntity("User", username);
	if (user) {
		return res.status(400).json({ msg: "User already exists" });
	}
	try {
		const encryptedPassword = bcryptjs.hashSync(password, 10);
		const newUser = new User(username, encryptedPassword, type);
		await addEntity("User", username, newUser);
		const token = await createJWT(username);
		return res
			.status(201)
			.json({ token, user: { ...newUser, password: null } });
	} catch (err) {
		return res.status(500).json({
			msg: `Error in signup: ${err}`,
		});
	}
};

module.exports = {
	login,
	signup,
};
