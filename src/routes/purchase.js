const express = require("express");
const router = express.Router();
const { createOrder } = require("../controller/purchase");

router.post("/purchase", createOrder);

module.exports = router;
