const { Router } = require("express");
const {
	addProduct,
	healthy,
	getAllProducts,
	deleteProduct,
	updateProduct,
} = require("../controllers/product");

const router = Router();

router.get("/healthy", healthy);
router.post("/", addProduct);
router.get("/", getAllProducts);
router.delete("/:name", deleteProduct);
router.put("/:name", updateProduct);

module.exports = router;
