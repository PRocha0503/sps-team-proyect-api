const { Router } = require("express");
const { login, signup } = require("../controllers/auth");

const router = Router();

router.post("/signup", signup);
router.get("/login", login);

module.exports = router;
