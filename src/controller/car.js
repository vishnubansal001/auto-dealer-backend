const Unit = require("../models/unit");

exports.getAllCars = async (req, res) => {
  try {
    const { year, price, name, model } = req.query;

    let searchFilter = {};

    if (name) {
      searchFilter.unitName = new RegExp(name, "i");
    }

    const detailsFilter = [];

    if (year) {
      detailsFilter.push({ key: "year", value: year });
    }

    if (price) {
      detailsFilter.push({ key: "price", value: price });
    }

    if (model) {
      detailsFilter.push({ key: "model", value: model });
    }

    if (detailsFilter.length > 0) {
      searchFilter.unitDetails = { $elemMatch: { $or: detailsFilter } };
    }

    const units = await Unit.find(searchFilter);

    return res.status(200).json({ units });
  } catch (err) {
    console.error("Error in searchUnits:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSingleCar = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    return res.status(200).json({ unit });
  } catch (err) {
    console.error("Error in getSingleUnit:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};