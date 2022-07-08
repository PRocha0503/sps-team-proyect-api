const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const { getEntityByKey, getEntity } = require("../database/config");

const validateJWT = async (req = request, res = response, next) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({
			msg: "NO TOKEN",
		});
	}
	try {
		const userKey = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		// console.log("HERE");
		// console.log(userKey);
		// console.log(userKey.username);
		const user = await getEntityByKey(userKey.username);
		if (!user) {
			return res.status(401).json({
				msg: "INVALID TOKEN",
			});
		}
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({
			msg: "INVALID TOKEN",
		});
	}
};

module.exports = {
	validateJWT,
};
