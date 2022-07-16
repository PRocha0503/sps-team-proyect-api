const { Router } = require("express");
const {
	healthy,
  getMappedOrder,
  getProductsGrouped,
} = require("../controllers/analytics");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get('/products', getProductsGrouped);
router.get("/healthy", healthy);
router.get('/:business', getMappedOrder);

module.exports = router;
