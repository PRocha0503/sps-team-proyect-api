const { response } = require("express");

const usuariosGet = (req, res = response) => {
	// Exp para los parms - son los que vienen despues de ?, para separarlos ente ellos es con un &
	//Exp el = en la desestructuracion es apr aponer defaults si no te lo mandan
	const { id = 1 } = req.query;
	res.json({
		msg: " get",
		id,
	});
};
const usuariosPut = (req, res = response) => {
	// Exp los paramas son lo que sacas de la url, vine como string
	const id = req.params.id;
	res.json({
		msg: "  put",
		id,
	});
};
const usuariosPost = (req, res = response) => {
	// Exp sacas el body de el request
	const { nombre } = req.body;
	res.json({
		msg: " post ",
		nombre,
	});
};
const usuariosDelete = (req, res = response) => {
	res.json({
		msg: " delete",
	});
};
const usuariosPatch = (req, res = response) => {
	res.json({
		msg: " patch",
	});
};

module.exports = {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
};
