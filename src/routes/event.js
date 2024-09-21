const express = require("express");
const router = express.Router();
const { getAllEvents, closeEvent } = require("../controller/event");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.get("/event", verifyAdmin, getAllEvents);
router.put("/event/:id", verifyAdmin, closeEvent);

module.exports = router;
