const express = require("express");
const router = express.Router();
const { getAllOrders } = require("../controller/order");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.get("/order", verifyAdmin, getAllOrders);

module.exports = router;
