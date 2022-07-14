const { Router } = require("express");
const {
	healthy,
	getAllBusiness,
	registerBusiness,
	deleteBusiness,
	getBusiness,
	updateBusiness,
	getNearestBusiness,
} = require("../controllers/business");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get('/nearest', getNearestBusiness); // TODO: Add JWT validation
router.get("/healthy", healthy);
router.get('/', getAllBusiness);
router.post('/', registerBusiness);
router.delete('/:name', deleteBusiness);
router.get('/:name', getBusiness);
router.put('/:name', updateBusiness);

module.exports = router;
