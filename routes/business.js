const { Router } = require("express");
const {
	healthy,
	getAllBusiness,
	registerBusiness,
	deleteBusiness,
	getBusiness,
	updateBusiness,
} = require("../controllers/business");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/healthy", healthy);
router.get('/', getAllBusiness);
router.post('/', registerBusiness);
router.delete('/:name', deleteBusiness);
router.get('/:name', getBusiness);
router.put('/:name', updateBusiness);

module.exports = router;
