// Exp: Carga las variables de entorno
require("dotenv").config();
//Exp: Crea una nueva instancia del servidor de express
const Server = require("./models/server");

const server = new Server();
server.listen();
