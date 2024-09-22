const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  closeEvent,
  getSingleEvent,
} = require("../controller/event");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.get("/event", verifyAdmin, getAllEvents);
router.put("/event/:id", verifyAdmin, closeEvent);
router.get("/event/:id", verifyAdmin, getSingleEvent);

module.exports = router;
