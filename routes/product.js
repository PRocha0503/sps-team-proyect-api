const { Router } = require("express");
const {
	addProduct,
	healthy,
	getProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
	getOwnerProduct,
} = require("../controllers/product");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/healthy", healthy);
router.post("/", addProduct);
router.get("/all", validateJWT, getAllProducts);
router.get("/", getProduct);
router.delete("/:name", deleteProduct);
router.put("/:name", updateProduct);
router.get("/business", getOwnerProduct);

module.exports = router;
