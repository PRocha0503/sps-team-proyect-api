const { Router } = require("express");
const {
	healthy,
	addOrder,
	getAllOrders,
	getUserOrders,
	updateOrder,
} = require("../controllers/order");

const router = Router();

router.get("/healthy", healthy);
router.get("/all", getAllOrders);
router.get("/:user", getUserOrders);
router.post("/", addOrder);
// router.get("/", getCoupon);
// router.delete("/:code", deleteCoupon);
router.put("/", updateOrder);

module.exports = router;
