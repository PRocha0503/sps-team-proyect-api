const { Router } = require("express");
const {
	healthy,
	addCoupon,
	getAllCoupons,
	getCoupon,
	deleteCoupon,
	updateCoupon,
	getCouponByOwner,
} = require("../controllers/coupon");

const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/healthy", validateJWT, healthy);
router.get("/all", validateJWT, getAllCoupons);
router.post("/", addCoupon);
router.get("/", getCoupon);
router.delete("/:code", deleteCoupon);
router.put("/:code", updateCoupon);
router.get("/:owner", getCouponByOwner);

module.exports = router;
