const { Router } = require("express");
const {
	login,
	signup,
	getUserInfo,
	isBusiness,
} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/validate", validateJWT, getUserInfo);
router.get("/isBusiness", validateJWT, isBusiness);

module.exports = router;
