const jwt = require("jsonwebtoken");

const createJWT = (username = " ") => {
	return new Promise((resolve, reject) => {
		const payload = { username };
		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: "1y",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	createJWT,
};
