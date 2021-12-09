//Exp: esto es una forma de usar exprees basado en clases
const express = require("express");
//Exp cors es para solo autorizar que alguans paginas peudan llamar el servidor, en chrome es obligatorio tener CORS
const cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersPath = "/api/user";
		//Middleware
		this.middlewares();
		//Routas de la aplicación
		this.routes();
	}
	middlewares() {
		//CORS
		this.app.use(cors());
		//Lectura y Parseo del body
		this.app.use(express.json());
		// Directorio publico
		this.app.use(express.static("public"));
	}
	routes() {
		this.app.use(this.usersPath, require("../routes/user"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto ", this.port);
		});
	}
}

module.exports = Server;
