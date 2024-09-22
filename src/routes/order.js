const express = require("express");
const router = express.Router();
const { getAllOrders, getSingleOrder } = require("../controller/order");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.get("/order", verifyAdmin, getAllOrders);
router.get("/order/:id", verifyAdmin, getSingleOrder);

module.exports = router;
