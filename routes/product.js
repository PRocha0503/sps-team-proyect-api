const { Router } = require("express");
const {
	addProduct,
	healthy,
	getProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
} = require("../controllers/product");

const router = Router();

router.get("/healthy", healthy);
router.post("/", addProduct);
router.get("/all", getAllProducts);
router.get("/", getProduct);
router.delete("/:name", deleteProduct);
router.put("/:name", updateProduct);

module.exports = router;
