const express = require("express");
const router = express.Router();
const { createEvent } = require("../controller/contact");

router.post("/contact", createEvent);

module.exports = router;
