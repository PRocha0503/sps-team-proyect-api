const { Router } = require("express");
const { login, signup, getUserInfo } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/validate", validateJWT, getUserInfo);

module.exports = router;
