const express = require("express");
const router = express.Router();
const { getAllCars, getSingleCar } = require("../controller/car");

router.get("/car", getAllCars);
router.get("/car/:id", getSingleCar);

module.exports = router;
