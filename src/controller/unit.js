const Unit = require("../models/unit.js");

exports.createUnit = async (req, res) => {
  try {
    const {
      _id,
      unitName,
      unitStatus,
      unitDescription,
      additionDate,
      unitDetails,
    } = req.body;

    const newUnit = new Unit({
      _id,
      unitName,
      unitStatus,
      unitDescription,
      additionDate,
      unitDetails,
    });

    await newUnit.save();

    return res
      .status(201)
      .json({ message: "Unit created successfully", unit: newUnit });
  } catch (err) {
    console.error("Error in createUnit:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    return res.status(200).json({ units });
  } catch (err) {
    console.error("Error in getUnits:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUnit = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    return res.status(200).json({ unit });
  } catch (err) {
    console.error("Error in getUnit:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const { unitName, unitStatus, unitDescription, additionDate, unitDetails } =
      req.body;

    const updatedUnit = await Unit.findByIdAndUpdate(
      req.params.id,
      { unitName, unitStatus, unitDescription, additionDate, unitDetails },
      { new: true }
    );

    if (!updatedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    return res
      .status(200)
      .json({ message: "Unit updated successfully", unit: updatedUnit });
  } catch (err) {
    console.error("Error in updateUnit:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(req.params.id);

    if (!deletedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    return res.status(200).json({ message: "Unit deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUnit:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
