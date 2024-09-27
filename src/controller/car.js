const Unit = require("../models/unit");

exports.getAllCars = async (req, res) => {
  try {
    const { price, make, oil } = req.query;

    let searchFilter = {};
    const detailsFilter = [];

    if (price) {
      detailsFilter.push({ key: "price", value: price });
    }

    if (make) {
      detailsFilter.push({ key: "make", value: make });
    }
    if (oil) {
      detailsFilter.push({ key: "oil", value: oil });
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

exports.getHomePageCars = async (req, res) => {
  try {
    const units = await Unit.find().limit(4);

    return res.status(200).json({ units });
  } catch (err) {
    console.error("Error in getHomePageUnits:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
