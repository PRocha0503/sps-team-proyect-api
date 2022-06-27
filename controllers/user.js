const { response } = require("express");

const usuariosGet = (req, res = response) => {
	const { id = 1 } = req.query;
	res.json({
		msg: " get",
		id,
	});
};
const usuariosPut = (req, res = response) => {
	const id = req.params.id;
	res.json({
		msg: "  put",
		id,
	});
};
const usuariosPost = (req, res = response) => {
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
