const express = require("express");
const router = express.Router();
const {
  getAllCars,
  getSingleCar,
  getHomePageCars,
} = require("../controller/car");

router.get("/car", getAllCars);
router.get("/car/:id", getSingleCar);
router.get("/cars/home", getHomePageCars);

module.exports = router;
