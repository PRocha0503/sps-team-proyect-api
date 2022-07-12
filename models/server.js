const express = require("express");

const cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			usersPath: "/api/users",
			productPath: "/api/products",
			couponPath: "/api/coupons",
			orderPath: "/api/orders",
			authPath: "/api/auth",
			businessPath: '/api/business',
		};
		//Middleware
		this.middlewares();
		this.routes();
	}
	middlewares() {
		//CORS
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static("public"));
	}
	routes() {
		this.app.use(this.paths.usersPath, require("../routes/user"));
		this.app.use(this.paths.productPath, require("../routes/product"));
		this.app.use(this.paths.couponPath, require("../routes/coupon"));
		this.app.use(this.paths.orderPath, require("../routes/order"));
		this.app.use(this.paths.authPath, require("../routes/auth"));
		this.app.use(this.paths.businessPath, require('../routes/business'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Server running on port: ", this.port);
		});
	}
}

module.exports = Server;
