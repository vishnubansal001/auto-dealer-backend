const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/user");

router.post("/user/signup", signUp);
router.post("/user/login", signIn);

module.exports = router;
