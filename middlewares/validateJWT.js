const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const validateJWT = async (req = request, res = response, next) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({
			msg: "NO TOKEN",
		});
	}
	try {
		const { username } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		const user = await getEntity("User", username);
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
