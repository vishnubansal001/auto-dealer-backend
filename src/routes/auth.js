const express = require("express");
const router = express.Router();
const { signUp, signIn, getProfileInfo } = require("../controller/auth");

router.post("/user/signup", signUp);
router.post("/user/login", signIn);
router.get("/user/me", getProfileInfo);

module.exports = router;
