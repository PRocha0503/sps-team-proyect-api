const { Router } = require("express");
const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
} = require("../controllers/user");

const router = Router();

//Exp manda info en json
router.get("/", usuariosGet);
//Exp ":" es para poner argumentos en el url, ya la ruta sin nada despues no funciona
router.put("/:id", usuariosPut);
//Exp poner data
router.post("/", usuariosPost);
//Exp borrar data
router.delete("/", usuariosDelete);
//Exp cambiar data
router.patch("/", usuariosPatch);
module.exports = router;
