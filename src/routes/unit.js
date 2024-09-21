const express = require("express");
const router = express.Router();
const {
  createUnit,
  getUnits,
  getUnit,
  updateUnit,
  deleteUnit,
} = require("../controller/unit");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.post("/unit", verifyAdmin, createUnit);
router.get("/unit", verifyAdmin, getUnits);
router.get("/unit/:id", verifyAdmin, getUnit);
router.put("/unit/:id", verifyAdmin, updateUnit);
router.delete("/unit/:id", verifyAdmin, deleteUnit);

module.exports = router;
