const { Router } = require("express");
const {
	healthy,
	addOrder,
	getAllOrders,
	getUserOrders,
	updateOrder,
} = require("../controllers/order");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/healthy", healthy);
router.get("/all", getAllOrders);
router.get("/", validateJWT, getUserOrders);
router.post("/", validateJWT, addOrder);
router.put("/", updateOrder);

module.exports = router;
