const { Router } = require("express");
const {
	healthy,
	addCoupon,
	getAllCoupons,
	getCoupon,
	deleteCoupon,
	updateCoupon,
} = require("../controllers/coupon");

const router = Router();

router.get("/healthy", healthy);
router.get("/all", getAllCoupons);
router.post("/", addCoupon);
router.get("/", getCoupon);
router.delete("/:code", deleteCoupon);
router.put("/:code", updateCoupon);

module.exports = router;
