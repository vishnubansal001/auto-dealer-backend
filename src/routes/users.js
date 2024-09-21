const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUser,
  getSingleUser,
} = require("../controller/users");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.put("/users/:id", verifyAdmin, updateUser);
router.get("/users/:id", verifyAdmin, getSingleUser);

module.exports = router;
