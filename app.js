// Load env variables
require("dotenv").config();
// Import and create new instanceof server
const Server = require("./models/server");
const server = new Server();
server.listen();
