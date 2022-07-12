const { Router } = require("express");
const {
	healthy,
	getCustomer,
	addCustomer,
	getAllCustomers,
} = require("../controllers/customer");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post("/healthy", healthy);
router.get("/", validateJWT, getCustomer);
router.get("/all", getAllCustomers);

router.post("/", validateJWT, addCustomer);

module.exports = router;
